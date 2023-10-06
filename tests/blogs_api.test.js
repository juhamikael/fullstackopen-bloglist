const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blogs = require("../models/blogs");
const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");

let TOKEN_USER;

const api = {
  get: (url) =>
    supertest(app).get(url).set("Authorization", `Bearer ${TOKEN_USER}`),
  post: (url, body) =>
    supertest(app)
      .post(url)
      .set("Authorization", `Bearer ${TOKEN_USER}`)
      .send(body),
  delete: (url) =>
    supertest(app).delete(url).set("Authorization", `Bearer ${TOKEN_USER}`),
  put: (url, body) =>
    supertest(app)
      .put(url)
      .set("Authorization", `Bearer ${TOKEN_USER}`)
      .send(body),
};

describe("Blogs API", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    await Blogs.deleteMany({});

    const passwordHash = await bcrypt.hash("test", 10);
    const user = new User({
      username: "testuser1",
      name: "Test User 1",
      passwordHash,
    });

    await user.save();

    const loginResponse = await supertest(app).post("/api/login").send({
      username: "testuser1",
      password: "test",
    });

    TOKEN_USER = loginResponse.body.token;

    await api.post("/api/blogs", helper.initialBlogs[0]).expect(201);
    await api.post("/api/blogs", helper.initialBlogs[1]).expect(201);
  });

  beforeEach(async () => {
    await Blogs.deleteMany({});
    await api.post("/api/blogs", helper.initialBlogs[0]).expect(201);
    await api.post("/api/blogs", helper.initialBlogs[1]).expect(201);
  });

  test("Identifying field of the returned blogs must be called id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0]).toBeDefined();
  });

  test("Blog posts can be added to the database", async () => {
    const newBlog = {
      title: "Test Blog Post",
      author: "Test Author",
      url: "https://testblogpost.com/",
      likes: 9,
    };

    await api.post("/api/blogs", newBlog).expect(201);

    const response = await api.get("/api/blogs");
    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContain("Test Blog Post");
  });

  test("New Blog post without title or url, returns 400", async () => {
    const newBlog = {
      author: "Test Author",
      likes: 9,
    };

    await api.post("/api/blogs", newBlog).expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("Blog post can be deleted", async () => {
    const response = await api.get("/api/blogs");
    const blogToDelete = response.body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(blogToDelete.title);
  });

  test("Blog post likes can be updated", async () => {
    const response = await api.get("/api/blogs");
    const blogToUpdate = response.body[0];
    const updatedBlog = {
      likes: 100,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`, updatedBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const contents = blogsAtEnd.map((r) => r.likes);
    expect(contents).toContain(100);
  });


});

afterAll(async () => {
  await mongoose.connection.close();
});
