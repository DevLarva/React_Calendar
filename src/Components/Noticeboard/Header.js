import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Andnlogo from '../../assets/andnlogo.png';
import LogoutIcon from '@mui/icons-material/Logout';  // 로그아웃 아이콘 import
import { signout } from '../ApiService';
export default function Header() {
    const navigate = useNavigate();

    function handleRefresh() {
        window.location.reload();
    }

    function handleClientClick() {
        navigate('/andn');
    }

    function handleCalendarClick() {
        navigate('/calendar');
    }

    function handleLogoutClick() {
        signout()
        console.log("Logging out...");
        // 예: navigate('/login');
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#F1F3F7' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Box
                        component="div"
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        onClick={handleRefresh}
                    >
                        <img
                            src={Andnlogo}
                            alt="And N"
                            style={{ marginRight: '16px', height: '40px', filter: 'invert(1)' }}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button size='large' sx={{ color: 'black' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }} onClick={handleCalendarClick}>
                            일정
                        </Typography>
                    </Button>
                    <Button size='large' sx={{ color: 'black' }} onClick={handleClientClick}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            클라이언트
                        </Typography>
                    </Button>
                    <Button size='large' sx={{ color: 'black' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            알림
                        </Typography>
                    </Button>

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
