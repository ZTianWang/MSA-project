/**
 * 管理axios拦截器
 */

import axios from "axios";
import { message } from 'antd'

const request = axios.create({
    timeout: 5000,
})

// request 拦截器
request.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        // req.headers.set('authorization', token);
        req.headers.set("authorization", `Bearer ${token}`);
    }
    return req;
});

// respose拦截器 + error处理
request.interceptors.response.use((res) => {
    return res.data;
}, (err) => {
    // 从全局中获取AppLayout中的hook方法登出
    if (err.response.status === 401) {
        window.logout();
    }
    message.error(err.message)
    return Promise.reject(err);
})

export default request;