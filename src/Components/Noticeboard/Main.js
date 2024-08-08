import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import PostList from './PostList';
import NewPostButton from './NewPostButton';
import { getArticles } from '../../api';  // API 호출 관련 함수 import
import { useNavigate } from 'react-router-dom';

function Main() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('title');
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getArticles();
                setPosts(data);
            } catch (error) {
                console.error("게시물 가져오기 실패:", error);
            }
        };
        fetchPosts();
    }, []);

    const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, '');

    const filteredPosts = posts.filter(post =>
        normalizeText(post[searchCriteria]).includes(normalizeText(searchQuery))
    );

    const handleNewPostClick = () => {
        navigate('/newpost');
    };

    const handlePostSaved = async () => {
        try {
            const data = await getArticles();
            setPosts(data);
            navigate('/');
        } catch (error) {
            console.error("게시물 가져오기 실패:", error);
        }
    };

    return (
        <>
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
        </>
    );
}

export default Main;
