import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginContext from './LoginContext';
import { API_BASE_URL } from "../../AppConfig"

const ACCESS_TOKEN = "ACCESS_TOKEN";

// axios 인스턴스 생성
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정
api.interceptors.request.use(config => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

const PrivateRoute = ({ children }) => {
    const { user, setUser } = useContext(LoginContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token) {
            setUser(true); // 토큰이 있으면 로그인 상태로 유지
        } else {
            setUser(false); // 토큰이 없으면 로그아웃 상태로 설정
        }

        setLoading(false); // 로딩 상태 종료
    }, [setUser]);

    if (loading) {
        return <div>Loading...</div>; // 로딩 상태 표시
    }

    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
