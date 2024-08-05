import axios from 'axios';
import { getToken } from "./auth"
// 기본 URL 설정
const api = axios.create({
    baseURL: 'http://andn-btest-env.eba-zwp5cit2.ap-northeast-2.elasticbeanstalk.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

// 요청 인터셉터 설정
api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;