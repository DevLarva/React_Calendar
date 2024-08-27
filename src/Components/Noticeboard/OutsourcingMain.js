import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import SearchBar from './SearchBar';
import OutsourcingList from './OutsourcingList';
import { getOutsourcingList } from '../../api';  // API 호출 관련 함수 import
import dayjs from 'dayjs';  // 날짜 변환을 위한 라이브러리

function OutsourcingMain() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('author');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getOutsourcingList();

                // createAt 값을 날짜 형식으로 변환
                const formattedData = data.map(post => ({
                    ...post,
                    // title: post.title || "제목 없음",  // title 필드가 비어 있을 경우 기본 값을 설정
                    date: dayjs(post.createdAt).format('YYYY-MM-DD')
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
                    <OutsourcingList posts={filteredPosts} />
                </Box>
            </Container>
        </>
    );
}

export default OutsourcingMain;