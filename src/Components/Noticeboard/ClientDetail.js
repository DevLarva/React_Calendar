import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box, Divider, Container, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientsDetail, downloadFile, delClientPost } from '../../api'; // 새로운 API 호출 함수 (상세보기 데이터를 가져옴)
import { jwtDecode } from 'jwt-decode'; // jwt-decode 임포트
import { getToken } from '../../auth'; // 토큰 가져오는 함수
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ClientPostDetail() {
    const { id } = useParams(); // URL 파라미터에서 게시물 ID를 가져옴
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        // 게시물 상세정보 가져오기
        getClientsDetail(id)
            .then(response => {
                setPost(response);
                console.log("Fetched Data", response);
                // 토큰에서 사용자 ID 추출
                const token = getToken();
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const currentUserId = decodedToken.sub; // 토큰에서 사용자 ID 추출// 게시물의 작성자 ID와 현재 사용자의 ID 비교
                    console.log("토큰", typeof currentUserId);
                    console.log("아이디", typeof response.authorId);

                    if (response.authorId == currentUserId) {
                        setIsOwner(true);
                    } else {
                        setIsOwner(false);
                    }
                }
            })
            .catch(error => {
                console.error('게시물 불러오기 중 오류 발생:', error);
                navigate('/error'); // 오류 발생 시 다른 페이지로 이동
            });
    }, [id, navigate]);

    const handleDownload = async (fileUrl) => {
        try {
            await downloadFile(fileUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleEdit = () => {
        // 편집 페이지로 이동console.log('게시물이 성공적으로 수정되었습니다');
        navigate(`/client/posts/edit`, { state: { postData: post } });
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('이 글을 삭제하시겠습니까?');
        if (!confirmDelete) {
            return; // 사용자가 삭제를 취소한 경우 함수 종료
        }
        try {
            await delClientPost(id); // 삭제 API 호출
            console.log('게시물이 성공적으로 삭제되었습니다');
            navigate('/client'); // 삭제가 성공적으로 완료된 후 페이지 이동
        } catch (error) {
            console.error('게시물 삭제 중 오류 발생:', error);
        }
    };

    if (!post) {
        return <div>.</div>;
    }

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            WORK SHEET - 상세보기
                        </Typography>
                    </Grid>
                    <Grid item>
                        {isOwner && (
                            <Box>
                                <IconButton aria-label="edit" onClick={handleEdit}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={handleDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Grid>
                </Grid>

                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Divider sx={{ mt: 3 }} />
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
                        <Box>
                            {post.fileUrls && post.fileUrls.length > 0 ? (
                                post.fileUrls.map((file, index) => (
                                    <Box key={index} sx={{ mt: 1 }}>
                                        <Typography variant="body2">
                                            <strong>파일 {index + 1}:</strong>{' '}
                                            <a
                                                href="#"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    handleDownload(file.url);
                                                }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {decodeURIComponent(file.url.split('/').pop())} {/* 파일명을 디코딩하여 표시 */}
                                            </a>
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