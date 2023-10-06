import blogService from "../services/blogs";
import { useLocation, useNavigate } from "react-router-dom";
import { parsePath } from "../lib/utils";
import { useEffect, useState } from "react";
import { showNotification } from "../reducers/notificationReducer";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { calculateTimeSince } from "../lib/time";

import { deleteBlog } from "../reducers/blogReducer";
import { useLike } from "../hooks/useLike";
import LikeButton from "@/components/LikeButton";

const SingleBlog = () => {
  const [comment, setComment] = useState("");
  const location = useLocation();
  const id = parsePath(location.pathname);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blog, setBlog] = useState("");
  const { likes, handleLike } = useLike(blog);
  useEffect(() => {
    const getBlog = async () => {
      const blog = await blogService.getById(id);
      setBlog(blog);
    };
    getBlog();
  }, [id]);

  if (!blog) {
    return null;
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        navigate("/");
        dispatch(deleteBlog(blog.id));
        dispatch(
          showNotification(
            `SUCCESSFULLY DELETED BLOG POST: ${blog.title} by ${blog.author} `,
            5,
            "success"
          )
        );
      } catch (error) {
        console.error("An error occurred while deleting blog:", error);
        dispatch(
          showNotification(
            `ERROR DELETING BLOG POST: ${blog.title} by ${blog.author}`,
            5,
            "error"
          )
        );
      }
    }
  };

  const handleComment = async () => {
    try {
      await blogService.commentBlog(blog.id, { content: comment });
      const updatedBlog = await blogService.getById(blog.id);
      setBlog(updatedBlog);
      dispatch(
        showNotification(
          `Successfully added comment to blog: ${blog.title} by ${blog.author}`,
          5,
          "success"
        )
      );
      setComment("");
    } catch (error) {
      console.error("An error occurred while commenting on blog:", error);
      dispatch(
        showNotification(
          `Error adding comment to blog: ${blog.title} by ${blog.author}`,
          5,
          "error"
        )
      );
    }
  };

  return (
    <div className="flex flex-col justify-center ">
      <div className="px-8 lg:px-0 lg:w-1/3 mx-auto pt-10">
        <a
          className="text-4xl font-bold group hover:text-primary/80 transition-all"
          href={`/users/${blog.user.id}`}
        >
          Blogpost created By{" "}
          <span className="text-primary group-hover:text-primary/80 transition-all">
            {" "}
            {blog.user.username}
          </span>
        </a>
        <div className="">
          <Card className={cn("bg-transparent text-accent w-full border-none")}>
            <CardHeader
              className={cn("px-0 flex flex-row justify-between items-center")}
            >
              <div>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>Author: {blog.author}</CardDescription>
              </div>
              {user.name === blog.user.name && (
                <Button
                  id="delete-btn"
                  onClick={handleDelete}
                  className={cn("w-32 bg-destructive hover:bg-destructive/80")}
                >
                  Remove
                </Button>
              )}
            </CardHeader>
            <CardContent className={cn("flex flex-col gap-y-2 px-0")}>
              <p>Url: {blog.url}</p>
              <LikeButton handleLike={handleLike} likes={likes} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="border-t border-accent/20 py-8">
          <p className="font-black">New Comment</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleComment();
            }}
            className="pt-4"
          >
            <Textarea
              className={cn("text-gray-800")}
              id="comment"
              placeholder="This is great!"
              type="text"
              name="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <Button
              type="submit"
              placeholder="Comment"
              className={cn("w-full mt-4")}
              id="submit-comment-btn"
            >
              Submit
            </Button>
          </form>
          <p className="font-black mt-8 pb-4 border-b border-accent/20 text-2xl">
            Comments
          </p>
          <div className="pt-4">
            {blog.comments &&
              blog.comments
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((comment, index) => (
                  <div key={index} className="flex flex-col py-1">
                    <div className="flex justify-between">
                      <p className="">{comment.content}</p>
                      <p>{calculateTimeSince(comment.createdAt)}</p>
                    </div>
                  </div>
                ))}
            {blog.comments.length === 0 && (
              <div>
                No one has commented on this blog yet. Be the first to comment!
                🤗
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
