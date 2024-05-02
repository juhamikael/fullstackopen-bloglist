const blogRouter = require("express").Router();
const Blog = require("../models/blogs");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;
    const user = request.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    if (!blog.likes) {
      blog.likes = 0;
    }

    if (!blog.title || !blog.url) {
      return response
        .status(400)
        .json({
          error: "Title and URL are required.",
        })
        .end();
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  }
);

blogRouter.post("/:id/comments", async (request, response, next) => {
  const { comment } = request.body;

  if (!comment || typeof comment !== "string") {
    return response
      .status(400)
      .send({ error: "Comment is required and should be a string" });
  }

  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).send({ error: "Blog not found" });
    }

    const newComment = { content: comment, createdAt: new Date() };
    blog.comments.push(newComment);
    await blog.save();
    response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});


blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: "Unauthorized user" });
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const keys = Object.keys(body);

  if (keys.some((key) => key !== "likes")) {
    return response.status(400).json({
      error: "Only 'likes' can be updated.",
    });
  }

  const blog = {
    likes: body.likes,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(200).end();
});

module.exports = blogRouter;
