import axios from "axios";
import { showToast } from "@nutui/nutui";
import useLoginStore from "@/store/loginStore";
import router from "@/router";
import { storeToRefs } from "pinia";
// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: "/api", // 你的 API 地址
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    showToast.loading("加载中", {
      duration: 0,
    });
    const { token } = useLoginStore();
    // 在请求发送之前可以进行一些操作，例如添加请求头或token等
    config.headers.Authorization = `Bearer ${token}`;
    const params = config.data;
    if (params) {
      // 循环遍历 params 对象的属性
      for (const key in params) {
        // 检查属性值是否为空（null、undefined 或空字符串）
        if (
          params[key] === null ||
          params[key] === undefined ||
          params[key] === ""
        ) {
          // 如果为空，从 params 对象中删除该属性
          delete params[key];
        }
      }
    }
    // 在请求发送之前可以进行一些操作，例如添加请求头或token等
    // config.headers.Authorization = 'Bearer YourTokenHere';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const { token } = storeToRefs(useLoginStore());
    showToast.hide();
    if (response.data.code != 1) {
      showToast.fail(response.data.msg);
    }
    if (response.data.code == 401) {
      router.push("/login");
      token.value = "";
      return Promise.reject(response.data);
    }
    // 在成功响应时可以进行一些操作，例如处理通用的成功逻辑
    return response.data;
  },
  (error) => {
    showToast.hide();
    // 在响应出错时可以进行一些操作，例如处理通用的错误逻辑
    return Promise.reject(error);
  }
);

export default axiosInstance;
