import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PostList({ posts }) {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (id) => {
        navigate(`/andn/posts/${id}`);
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
                    {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                        <TableRow
                            key={post.id}
                            onClick={() => handleRowClick(post.id)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell sx={{ width: '10%' }}>{page * rowsPerPage + index + 1}</TableCell>
                            <TableCell sx={{ width: '50%' }}>{post.title}</TableCell>
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
        </TableContainer>
    );
}

PostList.defaultProps = {
    posts: [],
};
