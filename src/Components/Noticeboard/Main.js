import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import SearchBar from './SearchBar';
import PostList from './PostList';
import NewPostButton from './NewPostButton';
import { getArticles } from '../../api';  // API 호출 관련 함수 import
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';  // 날짜 변환을 위한 라이브러리

function Main() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('title');
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getArticles();

                // createAt 값을 날짜 형식으로 변환
                const formattedData = data.map(post => ({
                    ...post,
                    date: dayjs(post.createAt).format('YYYY-MM-DD')
                }));

                setPosts(formattedData);
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
        navigate('/newpost');
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
                    <PostList posts={filteredPosts} />
                    <NewPostButton onClick={handleNewPostClick} />
                </Box>
            </Container>
        </>
    );
}

export default Main;
