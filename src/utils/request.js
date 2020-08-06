import axios from 'axios'
import { Toast } from 'vant'
const BASELINK = "/sars";


//过滤请求
axios.interceptors.request.use(
  config => {
    config.timeout = 10000;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    const res = response.data;
    if(res.code === 200){
      return Promise.resolve(res);
    }else{
      Toast.fail({
        message: res.message,
        duration: 1.5 * 1000
      })
      return Promise.reject(res);
    }
  },
  error => {
    Toast.fail({
      message: error.message,
      duration: 1.5 * 1000
    })
    return Promise.reject(error);
  }
);


export function sarsGet(url, data = {}) {
  return axios.get(BASELINK + url, {
    params: data
  });
}

export function sarsPost(url, data, headers = {}) {
  return axios.post(BASELINK + url, data, headers);
}

