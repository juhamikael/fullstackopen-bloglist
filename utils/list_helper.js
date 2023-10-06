const lodash = require("lodash");
const logger = require("./logger");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const favorite = blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current;
  }, blogs[0]);
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const authorWithMostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const authors = Object.entries(lodash.countBy(blogs, "author"));

  const mostBlogs = authors.reduce(
    (previous, current) => {
      return previous[1] > current[1] ? previous : current;
    },
    ["", 0]
  );

  return {
    author: mostBlogs[0],
    blogs: mostBlogs[1],
  };
};

const authorWithMostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const likesByAuthor = lodash(blogs)
    .groupBy("author")
    .map((authorBlogs, author) => ({
      author: author,
      likes: lodash.sumBy(authorBlogs, "likes"),
    }))
    .value();

  const authorWithMostLikes = lodash.maxBy(likesByAuthor, "likes");

  return authorWithMostLikes;
};

module.exports = {
  authorWithMostBlogs,
  authorWithMostLikes,
  dummy,
  favoriteBlog,
  totalLikes,
};
