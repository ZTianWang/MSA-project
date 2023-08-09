/**
 * manage axios interceptors
 */
import axios from "axios";
import { message } from 'antd'

const request = axios.create({
    timeout: 5000,
})

// request interceptors
request.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        // req.headers.set('authorization', token);
        req.headers.set("authorization", `Bearer ${token}`);
    }
    return req;
});

// respose interceptors + error proceccing
request.interceptors.response.use((res) => {
    return res.data;
}, (err) => {
    if (err.response.status === 401) {
        window.logout();
    }
    message.error("Illegal account.")
    return Promise.reject(err);
})

export default request;