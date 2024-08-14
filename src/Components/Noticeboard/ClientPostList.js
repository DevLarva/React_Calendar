import { React, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ClientPostList({ posts }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/client/posts/${id}`);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={posts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="페이지 당 항목 수:" // "Rows per page:"를 한글로 번역
                labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count !== -1 ? count : `more than ${to}`}`} // "1–10 of 100"과 같은 형태를 한글로 표현
                nextIconButtonText="다음 페이지" // "Next Page"를 한글로 번역
                backIconButtonText="이전 페이지" // "Previous Page"를 한글로 번역
            />
        </TableContainer >
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