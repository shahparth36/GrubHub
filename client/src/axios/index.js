import axios from "axios";
import { getTokens } from "../utils/localStorage";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://grubhub.herokuapp.com/api";
} else {
  baseURL = "http://localhost:5000/api";
}

const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const tokens = getTokens();
    const accessToken = tokens.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
