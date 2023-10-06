import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },

    appendBlogs(state, action) {
      state.push(action.payload);
    },

    deleteOneBlog(state, action) {
      const id = action.payload;
      const index = state.findIndex((blog) => blog.id === id);
      state.splice(index, 1);
    },

    updateOneBlog(state, action) {
      const id = action.payload;
      const index = state.findIndex((blog) => blog.id === id);
      if (index !== -1) {
        state[index].likes += 1;
      }
    },
  },
});

export const { appendBlogs, deleteOneBlog, setBlogs, updateOneBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (content) => {
  return async (dispatch) => {
    const returnedObject = await blogService.create(content);
    dispatch(appendBlogs(returnedObject));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteOneBlog());
  };
};

export const updateBlog = (id, likes) => {
  return async (dispatch) => {
    try {
      await blogService.update(id, { likes: likes });
      dispatch(updateOneBlog(id));
    } catch (error) {
      console.error("An error occurred while updating likes:", error);
    }
  };
};

export default blogSlice.reducer;
