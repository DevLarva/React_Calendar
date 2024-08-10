import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 import
import Andnlogo from '../../assets/andnlogo.png';

export default function Header() {
    const navigate = useNavigate(); // useNavigate 훅을 호출하여 네비게이터 생성

    function handleRefresh() {
        window.location.reload();
    }

    function handleClientClick() {
        navigate('/andn');
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
                            style={{ marginRight: '16px', height: '40px', filter: 'invert(1)' }} // 이미지 크기 및 색상 반전 스타일
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button size='large' sx={{ color: 'black' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
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
                </Box>
            </Toolbar>
        </AppBar>
    );
}
