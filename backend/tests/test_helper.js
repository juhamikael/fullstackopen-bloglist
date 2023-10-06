const Blog = require("../models/blogs");
const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

const initialUsers = [
  {
    username: "testuser1",
    name: "testuser1",
    password: bcrypt.hashSync("test", 10),
  },
  {
    username: "testuser2",
    name: "testuser2",
    password: bcrypt.hashSync("test", 10),
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const nonExistingUser = async () => {
  const user = new User({ content: "willremovethissoon" });
  await user.save();
  await user.remove();

  return user._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((note) => note.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  nonExistingUser,
  blogsInDb,
  usersInDb,
};
