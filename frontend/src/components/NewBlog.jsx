import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";

import { createNewBlog } from "../reducers/blogReducer";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { cn } from "../lib/utils";

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const addBlog = async (blogObject) => {
    if (!validateUrl(blogObject.url)) {
      dispatch(
        showNotification(
          "Error: Please enter a valid url before submitting",
          5,
          "error"
        )
      );
      return;
    }
    try {
      dispatch(createNewBlog(blogObject));
      dispatch(
        showNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          5,
          "success"
        )
      );
    } catch (exception) {
      dispatch(
        showNotification(
          "Error: Please fill out all fields before submitting",
          5,
          "error"
        )
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <div>
            <p className="font-bold">Title</p>
            <Input
              id="title"
              className={cn("text-gray-800  ")}
              data-testid="title"
              placeholder="Title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <p className="font-bold">Author</p>
            <Input
              id="author"
              data-testid="author"
              placeholder="Author"
              className={cn("text-gray-800  ")}
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <p className="font-bold">Url</p>
            <Input
              id="url"
              className={cn("text-gray-800  ")}
              placeholder="Url"
              data-testid="url"
              type="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
        </div>

        <Button
          className={cn("w-full mt-4")}
          id="submit-blog-btn"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default NewBlog;
