import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import SearchBar from './SearchBar';
import ClientPostList from './ClientPostList';
import NewPostButton from './NewPostButton';
import { getClientArticles, getClientsArticles } from '../../api';  // API 호출 관련 함수 import
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';  // 날짜 변환을 위한 라이브러리
import { jwtDecode } from 'jwt-decode'; // jwt-decode 임포트
import { getToken } from '../../auth'; // 토큰 가져오는 함수

function ClientMain() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('author');
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = getToken();
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const currentUserRole = decodedToken.role; // 토큰에서 사용자 ID 추출// 게시물의 작성자 ID와 현재 사용자의 ID 비교
                    console.log("유저 role", currentUserRole);

                    if (currentUserRole == "ROLE_CLIENT") {
                        const data = await getClientArticles();

                        // createAt 값을 날짜 형식으로 변환
                        const formattedData = data.map(post => ({
                            ...post,
                            // title: post.eventName || "제목 없음",  // title 필드가 비어 있을 경우 기본 값을 설정
                            date: dayjs(post.createdAt).format('YYYY-MM-DD')
                        }));
                        setPosts(formattedData);
                    }
                    if (currentUserRole == "ROLE_ANDN" || "ROLE_MANAGER") {
                        const data = await getClientsArticles();

                        // createAt 값을 날짜 형식으로 변환
                        const formattedData = data.map(post => ({
                            ...post,
                            // title: post.eventName || "제목 없음",  // title 필드가 비어 있을 경우 기본 값을 설정
                            date: dayjs(post.createdAt).format('YYYY-MM-DD')
                        }));
                        setPosts(formattedData);
                    }

                }
            } catch (error) {
                console.error("게시물 가져오기 실패:", error);
            }
        };
        fetchPosts();
    }, []);

    const normalizeText = (text) => text ? text.toLowerCase().replace(/\s+/g, '') : '';

    const filteredPosts = posts.filter(post =>
        post[searchCriteria] && normalizeText(post[searchCriteria]).includes(normalizeText(searchQuery))
    );

    const handleNewPostClick = () => {
        navigate('/client/posts');
    };


    return (
        <>
            <Container>
                <Box my={4}>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        searchCriteria={searchCriteria}
                        setSearchCriteria={setSearchCriteria}
                    />
                </Box>
                <Box my={4} sx={{ position: 'relative' }}>
                    <ClientPostList posts={filteredPosts} />
                    <NewPostButton onClick={handleNewPostClick} />
                </Box>
            </Container>
        </>
    );
}

export default ClientMain;