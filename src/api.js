import axios from 'axios';
import { getToken } from './auth'; // 토큰을 가져오는 함수

// 기본 URL 설정 및 요청 인터셉터 설정
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
        console.log("요청에 첨부된 토큰:", token);  // 디버그 로그
    } else {
        console.error("토큰을 찾을 수 없습니다");
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 게시물 목록 가져오기
export const getArticles = async () => {
    try {
        const response = await api.get('/api/andn/articles');
        return response.data;
    } catch (error) {
        console.error("게시물 가져오기 실패:", error);
        throw error;
    }
};

// 외주업체 게시물 목록 가져오기
export const getOutsourcingArticles = async () => {
    try {
        const response = await api.get('/api/client/documents');
        return response.data;
    } catch (error) {
        console.error("외주업체 글 가져오기 실패:", error);
        throw error;
    }
};

// Client 게시물 목록 가져오기
export const getClientArticles = async () => {
    try {
        const response = await api.get('/api/client/documents');
        console.log("서버 응답:", response);  // 응답 데이터 확인
        return response.data;
    } catch (error) {
        console.error("외주업체 글 가져오기 실패:", error);
        throw error;
    }
};

// 새 게시물 저장하기
export const savePost = async (formData) => {
    try {
        const response = await api.post('/api/andn/article', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("게시물 저장 중 오류 발생:", error);
        throw error;
    }
};


// Client 새 게시물 저장하기
export const saveClientPost = async (formData) => {
    try {
        const response = await api.post('/api/client/document', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("게시물 저장 중 오류 발생:", error);
        throw error;
    }
};

// AndN 게시물 상세보기 페이지
export const getArticlesDetail = async (id) => {
    try {
        const response = await api.get(`/api/andn/articles/${id}`);
        return response.data;
    } catch (error) {
        console.error("게시물 가져오기 실패:", error);
        throw error;
    }
};