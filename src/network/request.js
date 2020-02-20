import axios from 'axios'

export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    // baseURL : 'http://123.207.32.32:8000',
    baseURL : 'http://123.207.32.32:8000/api/hy',
    // baseURL : 'http://106.54.54.237:8000/api/hy',
    timeout : 15000
  })
  // 请求拦截
  instance.interceptors.request.use( config => {
    return config
  }, err => {
    console.log(err);
  })
  // 响应拦截
  instance.interceptors.response.use( res => {
    // console.log(res.data);
    return res.data
  }, err => {
    console.log(err)
  })
  // 发送真正的网络请求
  return instance(config)
}
