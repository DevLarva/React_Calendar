import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
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
                console.log("데이터", response)
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
        <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                행사명: {post.title}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="body1">행사 장소: {post.locate}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="body1">업체명: {post.companyName}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="body1">담당 디자이너: {post.designer}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                        부스 크기: {post.boothWidth}mm x {post.boothHeight}mm
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {post.installDate === null
                            ? "설치 기간: 사용자가 설정한 설치 기간이 없습니다."
                            : `설치 기간: ${post.installDate}`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">내용:</Typography>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                        {post.content}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">외주업체: {post.outsourcingName}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">첨부 파일:</Typography>
                    <Box>
                        {post.files && post.files.length > 0 ? (
                            post.files.map((file, index) => (
                                <Box key={index} sx={{ mt: 1 }}>
                                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                                        {file.name}
                                    </a>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2">첨부 파일이 없습니다.</Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
