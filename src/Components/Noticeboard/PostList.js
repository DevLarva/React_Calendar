import React, { useEffect, useState } from 'react';
import api from "../api/api";  // API utility file
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Box } from '@mui/material';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts list
        api.get('/api/andn/articles')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

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
                    {posts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Box sx={{ textAlign: 'center', padding: 2 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        아직 작성한 글이 없습니다.
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        posts.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell sx={{ width: '10%' }}>{index + 1}</TableCell>
                                <TableCell sx={{ width: '50%' }}>{post.title}</TableCell>
                                <TableCell sx={{ width: '20%' }}>{post.author}</TableCell>
                                <TableCell sx={{ width: '20%' }}>{new Date(post.createAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PostList;
