import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ClientPostList({ posts }) {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/client/posts/${id}`);
    };


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '10%' }}>No</TableCell>
                        <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '50%' }}>제목</TableCell>
                        <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '20%' }}>작성자</TableCell>
                        <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '20%' }}>작성날짜</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post, index) => (
                        <TableRow
                            key={index}
                            onClick={() => handleRowClick(post.id)}  // 게시물 ID를 기반으로 클릭 이벤트 추가
                            sx={{ cursor: 'pointer' }}  // 커서 스타일 변경
                        >
                            <TableCell sx={{ width: '10%' }}>{index + 1}</TableCell>
                            <TableCell sx={{ width: '50%' }}>{post.eventName}</TableCell>
                            <TableCell sx={{ width: '20%' }}>{post.author}</TableCell>
                            <TableCell sx={{ width: '20%' }}>{post.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

ClientPostList.defaultProps = {
    posts: [],
};


// import React, { useState, useEffect } from 'react';
// import { Box, Container } from '@mui/material';
// import PostList from './PostList'; // PostList 컴포넌트 import
// import NewPostButton from './NewPostButton'; // NewPostButton 컴포넌트 import
// import { getClientArticles } from '../../api';
// import { useNavigate } from 'react-router-dom';

// function ClientPostList() {
//     const [posts, setPosts] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const data = await getClientArticles();
//                 setPosts(data);
//             } catch (error) {
//                 console.error("외주업체 글 가져오기 실패:", error);
//             }
//         };
//         fetchPosts();
//     }, []);

//     const handleNewPostClick = () => {
//         navigate('/client/posts');
//     };


// }

// export default ClientPostList;