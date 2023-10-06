import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewBlog from "./NewBlog";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs";

describe("<NewBlog />", () => {
  let setSuccessMessage;
  let setErrorMessage;
  let setBlogs;

  beforeEach(() => {
    setSuccessMessage = jest.fn();
    setErrorMessage = jest.fn();
    setBlogs = jest.fn();
    blogService.create = jest.fn().mockResolvedValue({});
  });

  test("<NewBlog /> calls createBlog function with correct details", async () => {
    render(
      <NewBlog
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        blogs={[]}
        setBlogs={setBlogs}
        user={{
          username: "test",
          name: "test",
        }}
      />
    );

    const titleInput = screen.getByTestId("title");
    const authorInput = screen.getByTestId("author");
    const urlInput = screen.getByTestId("url");

    await userEvent.type(titleInput, "Test Blog");
    await userEvent.type(authorInput, "Test Author");
    await userEvent.type(urlInput, "https://test.com");

    const submitButton = screen.getByRole("button", { name: /create/i });
    await userEvent.click(submitButton);

    expect(blogService.create).toHaveBeenCalledWith({
      title: "Test Blog",
      author: "Test Author",
      url: "https://test.com",
    });
  });
});
