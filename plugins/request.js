/**
 * 基于 axios 封装的请求模块
 */
 import axios from 'axios'

 export const request = axios.create({
   baseURL: 'https://conduit.productionready.io'
 })
//  通过插件机制获取到上下文对象
 export default ({ store }) => {
  //  console.log(context)
   // 请求拦截器
   request.interceptors.request.use(function (config) {
     // 在发送请求之前做
     const { user } = store.state
     if (user && user.token) {
       config.headers.Authorization = `Token ${user.token}`
     }
     return config;
   }, function (error) {
     // 对请求错误(未发送时)做些什么
     return Promise.reject(error);
   });
   // 响应拦截器
 }
