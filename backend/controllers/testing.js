const router = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }

  response.status(204).end();
});

module.exports = router;
