import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs";

describe("<Blog/>", () => {
  let setBlogs;
  let blogs;
  let user;

  beforeEach(() => {
    setBlogs = jest.fn();
    blogs = [
      {
        title: "Test Title",
        author: "Test Author",
        id: "650b62fa12474c46acec8c6d",
        url: "https://www.google.com",
        likes: 0,
        user: {
          username: "test",
          name: "test",
        },
      },
    ];
    user = {
      username: "test",
      name: "test",
    };
    blogService.update = jest.fn().mockResolvedValue();
  });

  test("<Blog/> shows title and author, hides url and likes", async () => {
    render(<Blog key={1} blog={blogs[0]} blogs={blogs} setBlogs={setBlogs} user={user} />);

    const title = screen.getByText((content) => content.includes("Test Title"));
    const author = screen.getByText((content) => content.includes("Test Author"));

    expect(title).toBeDefined();
    expect(author).toBeDefined();
  });

  test("<Blog/> shows everything when show Details button is clicked", async () => {
    render(<Blog key={1} blog={blogs[0]} blogs={blogs} setBlogs={setBlogs} user={user} />);
    const button = screen.getByTestId("show-details-btn");
    await userEvent.click(button);

    const url = screen.getByText((content) => content.includes("https://www.google.com"));
    const likes = screen.getByText((content) => content.includes("Likes: 0"));

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  test("<Blog/> calls likeBlog function twice when like button is clicked twice", async () => {
    render(<Blog key={1} blog={blogs[0]} blogs={blogs} setBlogs={setBlogs} user={user} />);
    const button = screen.getByTestId("show-details-btn");
    await userEvent.click(button);

    const likeButton = screen.getByTestId("like-btn");
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(blogService.update).toHaveBeenCalledTimes(2);

    await blogService.update(blogs[0].id, { likes: 0 });
  });
});
