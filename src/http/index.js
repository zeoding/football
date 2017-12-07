import axios from "axios";
import config from "../config";
// 超时时间
axios.defaults.timeout = 5000;
axios.defaults.baseURL = config.BASE_URL;
// http请求拦截器
var loadinginstace;
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log("req error");
    return Promise.reject(error);
  }
);
// http响应拦截器
axios.interceptors.response.use(
  data => {
    return data;
  },
  error => {
    console.log("res error...");
    return Promise.reject(error);
  }
);
export default axios;
