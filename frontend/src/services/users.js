import { urlBuilder } from "../lib/url";
import axios from "axios";

const route = "/api/users";
const url = urlBuilder(route);

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

export default { getAll, getById };
