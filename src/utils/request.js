import axios from 'axios';
import {getToken} from "@/utils/tokenUtils";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000
})


service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = 'DoubleToken ' + getToken();
        }
        return config;
    }
);

service.interceptors.response.use(
    response => {
        const code = response.data.code;
        console.log(response.data);
        if (code < 200 || code > 300) {
            Notification.error({
                title: response.data.msg
            });
            return Promise.reject('error');
        } else {
            return response.data;
        }
    }
);

export default service;