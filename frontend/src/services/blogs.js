import axios from "axios";
import { urlBuilder } from "../lib/url";

const route = "/api/blogs";
const url = urlBuilder(route);

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const clearToken = () => {
  token = null;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(url, config);
  return response.data;
};

const getById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${url}/${id}`, config);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(url, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${url}/${id}`, newObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${url}/${id}`, config);
  return response.data;
};

const commentBlog = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${url}/${id}/comments`,
    { comment: comment.content },
    config
  );
  return response.data;
};

export default {
  clearToken,
  commentBlog,
  create,
  deleteBlog,
  getAll,
  getById,
  setToken,
  update,
};
