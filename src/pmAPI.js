import axios from "axios";

const pmAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

pmAPI.interceptors.request.use(config => {
  if (localStorage.getItem("tokne")) {
    config.headers["Authoriazation"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;
  }
  return config;
});

export default pmAPI;
