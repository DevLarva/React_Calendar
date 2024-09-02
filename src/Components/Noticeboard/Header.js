import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Andnlogo from '../../assets/andnlogo.png';
import LogoutIcon from '@mui/icons-material/Logout';  // 로그아웃 아이콘 import
import { signout } from '../ApiService';
import { jwtDecode } from 'jwt-decode'; // jwt-decode 임포트
import { getToken } from '../../auth'; // 토큰 가져오는 함수

export default function Header() {
    const [isManager, setIsManager] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentUserRole = decodedToken.role; // 토큰에서 사용자 ID 추출// 게시물의 작성자 ID와 현재 사용자의 ID 비교
            console.log("유저 role", currentUserRole);

            if (currentUserRole === "ROLE_MANAGER") {
                setIsManager(true);
            } else {
                setIsManager(false);
            }
        }
    }, []);

    function handleRefresh() {
        navigate('/calendar');
    }

    function handleManagerClick() {
        navigate('/manager');
    }

    function handleAndnClick() {
        navigate('/andn');
    }

    function handleCalendarClick() {
        navigate('/calendar');
    }

    function handleClientClick() {
        navigate('/clients');
    }

    function handleLogoutClick() {
        signout()
        console.log("Logging out");
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
                    <Button size='large' sx={{ color: 'black' }} onClick={handleAndnClick}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            외주업체
                        </Typography>
                    </Button>
                    <Button size='large' sx={{ color: 'black' }} onClick={handleClientClick}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            클라이언트
                        </Typography>
                    </Button>
                    {isManager && (
                        <Button size='large' sx={{ color: 'black' }} onClick={handleManagerClick}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                관리자
                            </Typography>
                        </Button>
                    )}
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