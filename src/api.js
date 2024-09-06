import axios from 'axios';
import { getToken } from './auth'; // 토큰을 가져오는 함수

// 기본 URL 설정 및 요청 인터셉터 설정
const api = axios.create({
    baseURL: 'http://andnproject-env.eba-vrmatduy.ap-northeast-2.elasticbeanstalk.com',
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

// 모든 게시물 목록 가져오기
export const getUsers = async () => {
    try {
        const response = await api.get('/api/manage/users');
        return response.data;
    } catch (error) {
        console.error("모든 유저 정보 가져오기 실패:", error);
        throw error;
    }
};

// 모든 게시물 목록 가져오기
export const getArticles = async () => {
    try {
        const response = await api.get('/api/andn/articles');
        return response.data;
    } catch (error) {
        console.error("게시물 가져오기 실패:", error);
        throw error;
    }
};

//모든 클라이언트가 작성한 게시물 목록 가져오기
export const getClientsArticles = async () => {
    try {
        const response = await api.get('/api/andn/documents');
        return response.data;
    } catch (error) {
        console.error("모든 클라이언트 유저의 글 가져오기 실패:", error);
        throw error;
    }
};

// 클라이언트 본인이 작성한 게시물 목록 가져오기
export const getClientArticles = async () => {
    try {
        const response = await api.get('/api/client/documents');
        console.log("서버 응답:", response);  // 응답 데이터 확인
        return response.data;
    } catch (error) {
        console.error("클라이언트 글 가져오기 실패:", error);
        throw error;
    }
};

// 새 게시물 저장하기
export const savePost = async (formData) => {
    try {
        const response = await api.post('/api/andn/article', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log("저장 데이터", response.data);
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
        console.log("받아온 데이터", response.data)
        return response.data;
    } catch (error) {
        console.error("게시물 가져오기 실패:", error);
        throw error;
    }
};

// Client 게시물 상세보기 페이지
export const getClientsDetail = async (id) => {
    try {
        const response = await api.get(`/api/client/documents/${id}`);
        console.log("받아온 데이터", response.data)
        return response.data;
    } catch (error) {
        console.error("게시물 가져오기 실패:", error);
        throw error;
    }
};


// 외주업체 유저 목록 불러오기
export const getOutsourcingUsers = async () => {
    try {
        const response = await api.get(`/api/outsourcing`);
        return response.data;
    } catch (error) {
        console.error("외주업체 유저 정보 불러오기 실패:", error);
        throw error;
    }
};


// 외주업체 게시물 페이지
export const getOutsourcingList = async () => {
    try {
        const response = await api.get(`/api/outsourcing/articles`);
        console.log("받아온 데이터", response.data)
        return response.data;
    } catch (error) {
        console.error("외주업체 글목록 불러오기 실패:", error);
        throw error;
    }
};
// 게시물 수정 함수
export const patchAndnPost = async (id, updatedPostData) => {
    try {
        // 백엔드의 PATCH API 호출
        const response = await api.patch(`/api/andn/articles/${id}`, updatedPostData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 요청 헤더에 JSON 타입 명시
            },
        });
        console.log("patchAndnPost 불러짐")
        return response.data; // 백엔드에서 반환된 데이터를 반환
    } catch (error) {
        console.error('게시물 수정 중 오류 발생:', error);
        throw error; // 에러를 호출한 함수로 전달
    }
};

// Andn 게시물 삭제
export const delAndnPost = async (id) => {
    try {
        const response = await api.delete(`/api/andn/articles/${id}`);
        return response.data;
    } catch (error) {
        console.error("Andn 게시물 삭제 에러:", error);
        throw error;
    }
};

// 유저 삭제
export const delUser = async (userID) => {
    try {
        const response = await api.delete(`/api/manage/users/${userID}`);
        return response.data;
    } catch (error) {
        console.error("유저 삭제 에러:", error);
        throw error;
    }
};

// 유저 승인
export const acceptUser = async (userID) => {
    try {
        const response = await api.patch(`/api/manage/users/${userID}`);
        return response.data;
    } catch (error) {
        console.error("유저 승인 에러:", error);
        throw error;
    }
};

// Client 게시물 수정
export const patchClientPost = async (id, updatedPostData) => {
    try {
        // 백엔드의 PATCH API 호출
        const response = await api.patch(`/api/client/documents/${id}`, updatedPostData, {
            headers: {
                'Content-Type': 'multipart/form-data', // 요청 헤더에 JSON 타입 명시
            },
        });
        console.log("patchAndnPost 불러짐")
        return response.data; // 백엔드에서 반환된 데이터를 반환
    } catch (error) {
        console.error('게시물 수정 중 오류 발생:', error);
        throw error; // 에러를 호출한 함수로 전달
    }
};

// Client 게시물 삭제
export const delClientPost = async (id) => {
    try {
        const response = await api.delete(`/api/client/documents/${id}`);
        return response.data;
    } catch (error) {
        console.error("Client 게시물 삭제 에러:", error);
        throw error;
    }
}

// 외주업체 게시물 상세보기 페이지
export const getOutsourcingDetail = async (id) => {
    try {
        const response = await api.get(`/api/andn/articles/${id}`);
        return response.data;
    } catch (error) {
        console.error("외주업체 상세보기 불러오기 실패:", error);
        throw error;
    }
};

// 다운로드 
export const downloadFile = async (fileUrl) => {
    try {
        // 파일 URL을 URL 경로로 안전하게 인코딩
        const encodedUrl = encodeURIComponent(fileUrl);
        const apiUrl = `/download?url=${encodedUrl}`;
        console.log("apiUrl:" + apiUrl);

        const response = await api.get(apiUrl, {
            responseType: 'blob',  // 서버에서 보내는 파일을 Blob 형식으로 받아옴
            headers: {
                'Accept': 'application/octet-stream',
            }
        });

        if (response.status === 200) {
            // Content-Disposition 헤더에서 파일명 추출
            const disposition = response.headers['content-disposition'];
            let fileName = decodeURIComponent(fileUrl.split('/').pop()); // 기본 파일명 설정

            if (disposition) {
                const fileNameMatch = disposition.match(/filename(?:\*=UTF-8'')?"(.+?)"/);
                if (fileNameMatch && fileNameMatch[1]) {
                    // 파일 이름 디코딩
                    fileName = decodeURIComponent(fileNameMatch[1]);
                }
            }

            // 파일 다운로드 처리 (예: Blob 사용)
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a); // 파이어폭스 호환성을 위해 추가
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // URL 해제
        } else {
            throw new Error(`Failed to download file. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};