const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Users = require("../models/user");
const helper = require("./test_helper");

beforeEach(async () => {
  await Users.deleteMany({});
  await Users.insertMany(helper.initialUsers);
});

describe("Users API", () => {
  test("Password must be at least 3 characters long.", async () => {
    const newUser = {
      username: "test",
      name: "test",
      password: "ab",
    };
    
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(res.body.error).toBe(
          "Password must be at least 3 characters long."
        );
      });
  });

  test("Username must be unique.", async () => {
    const newUser = {
      username: "testuser1",
      name: "testuser1",
      password: "test",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBe("Username 'testuser1' already exists.");
      });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
