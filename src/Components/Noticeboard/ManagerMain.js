import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import SearchBar from './SearchBar';
import UserList from './UserList';
import { getUsers } from '../../api';  // API 호출 관련 함수 import

function ManagerMain() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('name');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();

                // createAt 값을 날짜 형식으로 변환
                const formattedData = data.map(user => ({
                    ...user,
                }));
                setUsers(formattedData);
            } catch (error) {
                console.error("게시물 가져오기 실패:", error);
            }
        };
        fetchUsers();
    }, []);

    const normalizeText = (text) => text ? text.toLowerCase().replace(/\s+/g, '') : '';

    const filteredUsers = users.filter(user =>
        user[searchCriteria] && normalizeText(user[searchCriteria]).includes(normalizeText(searchQuery))
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
                    <UserList users={filteredUsers} />
                </Box>
            </Container>
        </>
    );
}

export default ManagerMain;