const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blogs");

const crypto = require("crypto");
const fetch = require("node-fetch");

function sha1(input) {
  return crypto.createHash("sha1").update(input).digest("hex").toUpperCase();
}

async function checkPassword(password) {
  const hash = sha1(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`
  );
  const data = await response.text();
  const leaks = data.split("\r\n").map((line) => line.split(":")[0]);

  return leaks.includes(suffix);
}

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    comments: 1,
  });
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (!username || !password || !name) {
    return response.status(400).json({
      error: "Username and password are required.",
    });
  }

  const users = await User.find({});

  if (users.some((user) => user.username === username)) {
    return response.status(400).json({
      error: `Username '${username}' already exists.`,
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: "Password must be at least 3 characters long.",
    });
  }

  const isPasswordExposed = await checkPassword(password);

  if (isPasswordExposed && process.env.NODE_ENV !== "test") {
    return response.status(400).json({
      error:
        "This password has been exposed in a data breach and should not be used.",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.delete("/:id", async (request, response) => {
  const userId = request.params.id;
  await User.findByIdAndDelete(userId);
  await Blog.find({ user: userId });
  await Blog.deleteMany({ user: userId });
  response.status(204).end();
});

module.exports = usersRouter;
