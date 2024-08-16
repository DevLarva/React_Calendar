import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box, Divider, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientsDetail, downloadFile } from '../../api'; // 새로운 API 호출 함수 (상세보기 데이터를 가져옴)

export default function ClientPostDetail() {
    const { id } = useParams(); // URL 파라미터에서 게시물 ID를 가져옴
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // 게시물 상세정보 가져오기
        getClientsDetail(id)
            .then(response => {
                setPost(response);
                console.log("데이터", response)
            })
            .catch(error => {
                console.error('게시물 불러오기 중 오류 발생:', error);
            });
    }, [id, navigate]);

    if (!post) {
        return <div>.</div>;
    }
    const handleDownload = async (fileUrl) => {
        try {
            await downloadFile(fileUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    WORK SHEET - 상세보기
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Client</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>행사명:</strong> {post.eventName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>업체명:</strong> {post.companyName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>담당자:</strong> {post.manager}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>연락처:</strong> {post.callNumber}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>행사 장소:</strong> {post.location}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>부스 배치도:</strong> {post.boothLayout}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">부스 담당자</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>담당자:</strong> {post.boothManager}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>연락처:</strong> {post.boothCallNumber}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <strong>설치 예정일시:</strong> {post.installDate ? post.installDate : "설치 예정일시가 설정되지 않았습니다."}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <strong>철거 예정일시:</strong> {post.removeDate ? post.removeDate : "철거 예정일시가 설정되지 않았습니다."}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">그래픽 신청 내역</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">첨부 파일</Typography>
                        <Divider />
                        <Box>
                            {post.fileUrls && post.fileUrls.length > 0 ? (
                                post.fileUrls.map((file, index) => (
                                    <Box key={index} sx={{ mt: 1 }}>
                                        <Typography variant="body2">
                                            <strong>파일 {index + 1}:</strong>{' '}
                                            <button
                                                onClick={() => handleDownload(file.url)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'black',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {decodeURIComponent(file.url.split('/').pop())} {/* 파일명을 디코딩하여 표시 */}
                                            </button>
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2">첨부 파일이 없습니다.</Typography>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">물품 픽업</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>신청인:</strong> {post.applicant}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>연락처:</strong> {post.applicantNum}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <strong>보관 일시:</strong> {post.collectionDay ? post.collectionDay : "보관 일시가 설정되지 않았습니다."}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><strong>수거 장소:</strong> {post.collectionLoc}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">메모</Typography>
                        <Divider />
                        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', mt: 2 }}>
                            <Typography variant="body2">{post.memo}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
