const {
  authorWithMostBlogs,
  authorWithMostLikes,
  dummy,
  favoriteBlog,
  totalLikes,
} = require("../utils/list_helper");

const { emptyBlog, multipleBlogs, oneBlog } = require("./data/test_data");

describe("Initial test / dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("Total likes", () => {
  test("of empty list is zero", () => {
    const result = totalLikes(emptyBlog);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = totalLikes(oneBlog);
    expect(result).toBe(7);
  });

  test("of a bigger list is calculated right", () => {
    const expectedTotalLikes = multipleBlogs.reduce(
      (sum, blog) => sum + blog.likes,
      0
    );
    const result = totalLikes(multipleBlogs);
    expect(result).toBe(expectedTotalLikes);
  });
});

describe("Favorite blog", () => {
  test("of empty list is empty object", () => {
    const result = favoriteBlog(emptyBlog);
    expect(result).toEqual({});
  });

  test("when list has one blog, equals that blog values", () => {
    const result = favoriteBlog(oneBlog);
    expect(result).toEqual({
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    });
  });

  test("when list has multiple blogs, equals the blog with most likes", () => {
    const result = favoriteBlog(multipleBlogs);

    const isValid =
      JSON.stringify(result) ===
        JSON.stringify({
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          likes: 12,
        }) ||
      JSON.stringify(result) ===
        JSON.stringify({
          title: "Clean Code",
          author: "Robert C. Martin",
          likes: 12,
        });

    expect(isValid).toBe(true);
  });
});

describe("Author with most blogs", () => {
  test("should return empty object if list is empty", () => {
    const result = authorWithMostBlogs(emptyBlog);
    expect(result).toEqual({});
  });

  test("should return author with most blogs when list has one blog", () => {
    const result = authorWithMostBlogs(oneBlog);
    expect(result).toEqual({
      author: "Michael Chan",
      blogs: 1,
    });
  });

  test("should return author with most blogs", () => {
    const result = authorWithMostBlogs(multipleBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 4,
    });
  });
});

describe("Author with most likes", () => {
  test("should return author with most likes", () => {
    const result = authorWithMostLikes(multipleBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      likes: 24,
    });
  });
});
