// import React from 'react';
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

// export default function PostList({ posts }) {
//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '10%' }}>No</TableCell>
//                         <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '50%' }}>제목</TableCell>
//                         <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '20%' }}>작성자</TableCell>
//                         <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '20%' }}>작성날짜</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {posts.map((post, index) => (
//                         <TableRow key={index}>
//                             <TableCell sx={{ width: '10%' }}>{index + 1}</TableCell>
//                             <TableCell sx={{ width: '50%' }}>{post.title}</TableCell>
//                             <TableCell sx={{ width: '20%' }}>{post.author}</TableCell>
//                             <TableCell sx={{ width: '20%' }}>{post.date}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import PostList from './PostList'; // PostList 컴포넌트 import
import NewPostButton from './NewPostButton'; // NewPostButton 컴포넌트 import
import { getOutsourcingArticles } from '../../api';
import { useNavigate } from 'react-router-dom';

function ClientPostList() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getOutsourcingArticles();
                setPosts(data);
            } catch (error) {
                console.error("외주업체 글 가져오기 실패:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleNewPostClick = () => {
        navigate('/newpost');
    };

    return (
        <Container>
            <Box my={4} sx={{ position: 'relative' }}>
                <PostList posts={posts} />
                <NewPostButton onClick={handleNewPostClick} />
            </Box>
        </Container>
    );
}

export default ClientPostList;