import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, DEFAULT_HEADERS, IS_LOGGED_IN_KEY } from "../config/app";
import { API_URI } from "../config/constants";
import { HttpStatus } from "../nsw/HttpStatus";

/**
 * create new axios instance for client side fetching
 */
const axiosClient = axios.create({
  baseURL: API_URI,
  headers: DEFAULT_HEADERS,
});

axiosClient.interceptors.request.use((config) => {
  if (!config.headers) return;

  config.headers["Authorization"] = `Bearer ${window.localStorage.getItem(
    ACCESS_TOKEN,
  )}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case HttpStatus.UNAUTHORIZED:
        Cookies.remove(IS_LOGGED_IN_KEY);
        window.localStorage.removeItem(ACCESS_TOKEN);
        break;

      default:
        return Promise.reject(error.response.data);
    }
  },
);

export default axiosClient;
