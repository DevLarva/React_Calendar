import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlobalContext from './Context/LoginContext';
import CalendarContext from '../../context/GlobalContext'; // CalendarContext import
import { Box, TextField, Button, Container, Typography, Paper, Grid, InputAdornment, IconButton, Divider } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Andnlogo from "../../assets/andnlogo.png"
import { signin, call } from '../ApiService'; // Import signin and call functions

const Login = () => {
    const { setUser } = useContext(GlobalContext);
    const { dispatchCalEvent } = useContext(CalendarContext); // context에서 dispatchCalEvent 불러오기
    const [userId, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        const userDTO = {
            userID: userId,
            password: password,
        };

        try {
            // 서버에 로그인 요청 보내기
            const response = await signin(userDTO);

            // 응답 데이터에서 사용자 타입 가져오기
            const userType = response.role;

            if (userType) {
                setUser({ userId, userType });
                console.log("타입", userType);

                // 사용자 타입에 따라 리다이렉트
                switch (userType) {
                    case 'ROLE_ANDN':
                        // 달력 데이터를 먼저 가져오기
                        const calendarData = await call('/api/andnCalendar/todo', 'GET');
                        dispatchCalEvent({ type: 'set', payload: calendarData });
                        console.log("달력 데이터 얼리 패치", calendarData);
                        // 달력 페이지로 리다이렉트
                        navigate('/calendar');
                        break;

                    case 'ROLE_CLIENT':
                        navigate('/client');
                        break;

                    case 'ROLE_OUTSOURCING':
                        navigate('/OutsourcingMain');
                        break;

                    default:
                        navigate('/');
                }
            } else {
                console.error('응답에서 userType을 찾을 수 없습니다.');
                alert('로그인 처리 중 문제가 발생했습니다.');
            }
        } catch (error) {
            // 로그인 실패 처리
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.');
            console.error('Login error:', error);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h2" variant="h1" align="center" sx={{ marginTop: 4 }}>
                <img src={Andnlogo} alt="And N" height={70} style={{ filter: 'invert(1)' }} />
            </Typography>
            <Paper elevation={5} sx={{ padding: 2, marginTop: 2 }}>
                <Box component="form" noValidate sx={{ mt: 1 }} onKeyDown={handleKeyDown}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="아이디"
                        autoComplete="username"
                        autoFocus
                        value={userId}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="비밀번호"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        로그인
                    </Button>
                </Box>
                <Divider sx={{ mt: 1 }} />
                <Grid item xs={4} sx={{ marginTop: 3 }} >
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button fullWidth color="primary">
                            회원가입
                        </Button>
                    </Link>
                </Grid>
            </Paper >
            <Divider />
        </Container >
    );
};

export default Login;
