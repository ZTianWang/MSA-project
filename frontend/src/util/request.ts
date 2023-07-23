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
        req.headers.set('authorization', token);
    }
    return req;
});

// respose拦截器 + error处理
request.interceptors.response.use((res) => {
    console.log("Response Code:", res.status);
    return res.data;
}, (err) => {
    console.log("response-------", err.message);
    message.error(err.message)
    return Promise.reject(err);
})

export default request;