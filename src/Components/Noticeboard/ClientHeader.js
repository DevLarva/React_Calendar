
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Button, Typography } from '@mui/material';
import Andnlogo from '../../assets/andnlogo.png';
import { signout } from '../ApiService';
import LogoutIcon from '@mui/icons-material/Logout';  // 로그아웃 아이콘 import

export default function Header() {
    function handleRefresh() {
        window.location.reload();
    }
    function handleLogoutClick() {
        signout();
        console.log("Logging out");
    }
    return (
        <AppBar position="static" sx={{ backgroundColor: '#F1F3F7' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Box
                        component="div"
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        onClick={handleRefresh}
                    >
                        <img
                            src={Andnlogo}
                            alt="And N"
                            style={{ marginRight: '16px', height: '40px', filter: 'invert(1)' }} // 이미지 크기 및 색상 반전 스타일
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        size='large'
                        sx={{
                            color: 'black',
                            border: '1px solid black', // outline 스타일
                            display: 'flex',
                            alignItems: 'center',
                            padding: '6px 10px', // 아이콘과 텍스트 사이 여유 공간 조절
                        }}
                        onClick={handleLogoutClick}
                    >
                        <LogoutIcon sx={{ marginRight: '3px' }} /> {/* 로그아웃 아이콘 추가 */}
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            로그아웃
                        </Typography>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
