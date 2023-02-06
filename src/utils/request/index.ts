import axios from "axios";

const instance = axios.create({
  baseURL: 'https://www.xxx.api',
  timeout: 8000,
  headers: {

  }
});


instance.interceptors.request.use((config) => {
  return config;
}, error => {
  return error;
})

instance.interceptors.response.use(res => {
  const {code} = res.data;
  if(code !== 200 && code !== 0 && code !== 2000) {
    console.log('请求成功，但被拦截的数据',res)
    throw res.data;
  }
  return res.data;
}, error => {
  return error;
})

function request(method, url, params, config) {
  return instance.request({
    method: method,
    url: url,
    params: params,
    ...config
  });
}

export default request
