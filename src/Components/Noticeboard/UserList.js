import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { delUser } from '../../api';

export default function UserList({ users }) {
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

    const translateRole = (role) => {
        switch (role) {
            case 'ROLE_OUTSOURCING':
                return '외주업체';
            case 'ROLE_ANDN':
                return '앤드앤';
            case 'ROLE_CLIENT':
                return '클라이언트';
            case 'ROLE_MANAGER':
                return '관리자';
            default:
                return role;
        }
    };

    const handleDelete = async (userID) => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await delUser(userID);
                alert("사용자가 삭제되었습니다.");
                navigate(0); // 페이지 새로고침을 통해 업데이트된 목록을 보여줍니다.
            } catch (error) {
                console.error("삭제 중 오류가 발생했습니다:", error);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '5%' }}>No</TableCell>
                        <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '20%' }}>이름</TableCell>
                        <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '20%' }}>아이디</TableCell>
                        <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '20%' }}>소속</TableCell>
                        <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', width: '5%' }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                        <TableRow
                            key={user.id}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell sx={{ width: '5%' }}>{page * rowsPerPage + index + 1}</TableCell>
                            <TableCell sx={{ width: '20%' }}>{user.name}</TableCell>
                            <TableCell sx={{ width: '20%' }}>{user.userID}</TableCell>
                            <TableCell sx={{ width: '20%' }}>{translateRole(user.role)}</TableCell>
                            <TableCell sx={{ width: '5%' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleDelete(user.userID)}
                                >
                                    삭제
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
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

UserList.defaultProps = {
    users: [],
};