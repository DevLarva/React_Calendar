import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box, Divider, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticlesDetail } from '../../api'; // 새로운 API 호출 함수 (상세보기 데이터를 가져옴)

export default function PostDetail() {
    const { id } = useParams(); // URL 파라미터에서 게시물 ID를 가져옴
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // 게시물 상세정보 가져오기
        getArticlesDetail(id)
            .then(response => {
                setPost(response);
                console.log("데이터", response);
            })
            .catch(error => {
                console.error('게시물 불러오기 중 오류 발생:', error);
                navigate('/error'); // 오류 발생 시 다른 페이지로 이동
            });
    }, [id, navigate]);

    if (!post) {
        return <div>.</div>;
    }

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    행사 상세보기
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6">행사 정보</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>행사명:</strong> {post.title}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>행사 장소:</strong> {post.locate}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>업체명:</strong> {post.companyName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>담당 디자이너:</strong> {post.designer}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>부스 크기:</strong> {post.boothWidth}mm x {post.boothHeight}mm</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <strong>설치 기간:</strong> {post.installDate ? post.installDate : "사용자가 설정한 설치 기간이 없습니다."}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">내용</Typography>
                        <Divider />
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', mt: 2 }}>
                            <Typography variant="body2">{post.content}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">외주업체 정보</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>외주업체:</strong> {post.outsourcingName}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">첨부 파일</Typography>
                        <Divider />
                        <Box>
                            {post.files && post.files.length > 0 ? (
                                post.files.map((file, index) => (
                                    <Box key={index} sx={{ mt: 1 }}>
                                        <Typography variant="body2">
                                            <strong>파일 {index + 1}:</strong> <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2">첨부 파일이 없습니다.</Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
