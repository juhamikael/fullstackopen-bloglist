import React from "react";
import Blog from "../components/Blog";
import { useSelector } from "react-redux";

const Home = () => {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return (
    <>
      {blogs.length === 0 && (
        <div className="text-center h-screen items-center flex justify-center">
          <h1 className="text-2xl font-black">No blogs found</h1>
        </div>
      )}
      <div id="blog-list">
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default Home;
