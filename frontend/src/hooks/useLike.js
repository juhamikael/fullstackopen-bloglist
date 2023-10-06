import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogReducer"; // import the updateBlog action

export const useLike = (blog) => {
  const [likes, setLikes] = useState(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (blog && typeof blog.likes === "number") {
      setLikes(blog.likes);
    }
  }, [blog]);

  const handleLike = async () => {
    if (likes !== null) {
      setLikes((prevLikes) => {
        const updatedLikes = prevLikes + 1;
        dispatch(updateBlog(blog.id, updatedLikes));
        return updatedLikes;
      });
    }
  };

  return {
    likes,
    handleLike,
  };
};
