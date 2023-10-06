import axios from "axios";
import { urlBuilder } from "../lib/url";

const route = "/api/login";
const url = urlBuilder(route);

const login = async (credentials) => {
  const response = await axios.post(url, credentials);
  return response.data;
};

export default { login };
