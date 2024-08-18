// import React, { useEffect, useState } from 'react';
// import { Paper, Typography, Grid, Box, Divider, Container, IconButton } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getArticlesDetail, downloadFile, delAndnPost } from '../../api';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { jwtDecode } from 'jwt-decode'; // jwt-decode 임포트
// import { getToken } from '../../auth'; // 토큰 가져오는 함수

// export default function PostDetail() {
//     const { id } = useParams(); // URL 매개변수에서 게시물 ID 가져오기
//     const navigate = useNavigate();
//     const [post, setPost] = useState(null);
//     const [isOwner, setIsOwner] = useState(false);
//     // 사용자가 작성자인지 여부를 확인하는 상태
//     useEffect(() => {
//         // 게시물 세부 정보 가져오기
//         getArticlesDetail(id)
//             .then(response => {
//                 setPost(response);
//                 console.log("Fetched Data", response);
//                 // 토큰에서 사용자 ID 추출
//                 const token = getToken();
//                 if (token) {
//                     const decodedToken = jwtDecode(token);
//                     const currentUserId = decodedToken.sub; // 토큰에서 사용자 ID 추출// 게시물의 작성자 ID와 현재 사용자의 ID 비교
//                     console.log("토큰", typeof currentUserId);
//                     console.log("아이디", typeof response.authorId);

//                     if (String(response.authorId) === String(currentUserId)) {
//                         console.log("토큰", typeof toString(currentUserId), currentUserId);
//                         console.log("아이디", typeof toString(response.authorId), response.authorId);
//                         setIsOwner(true);
//                     } else {
//                         setIsOwner(false);
//                     }
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching post details:', error);
//             });

//     }, [id, navigate]);

//     useEffect(() => {
//         console.log("isOwner 상태 값:", isOwner);
//     }, [isOwner]);



//     const handleDownload = async (fileUrl) => {
//         try {
//             await downloadFile(fileUrl);
//         } catch (error) {
//             console.error('Error downloading file:', error);
//         }
//     };
//     const handleEdit = () => {
//         // 현재 게시물 데이터를 수정 페이지로 전달
//         console.log("수정 데이터 이동", { state: { postData: post } });
//         navigate(`/andn/posts/edit`, { state: { postData: post } });
//     };

//     const handleDelete = async () => {
//         const confirmDelete = window.confirm('이 글을 삭제하시겠습니까?');
//         if (!confirmDelete) {
//             return; // 사용자가 삭제를 취소한 경우 함수 종료
//         }

//         try {
//             await delAndnPost(id); // 삭제 API 호출console.log('게시물이 성공적으로 삭제되었습니다');
//             navigate('/andn'); // 삭제가 성공적으로 완료된 후 페이지 이동
//         } catch (error) {
//             console.error('게시물 삭제 중 오류 발생:', error);
//         }
//     };

//     if (!post) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <Container component="main" maxWidth="md">
//             <Paper elevation={3} sx={{ padding: 3, marginTop: 3, position: 'relative' }}>
//                 {/* 이 부분에서 사용자가 작성자일 때만 수정/삭제 버튼을 렌더링 */}

//                 {isOwner && (
//                     <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
//                         <IconButton aria-label="edit" onClick={handleEdit}>
//                             <EditIcon />
//                         </IconButton>
//                         <IconButton aria-label="delete" onClick={handleDelete}>
//                             <DeleteIcon />
//                         </IconButton>
//                     </Box>
//                 )}
//                 <Typography variant="h5" align="center" gutterBottom>
//                     행사 상세보기
//                 </Typography>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12}>
//                         <Typography variant="h6">행사 정보</Typography>
//                         <Divider />
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Typography variant="body1"><strong>행사명:</strong> {post.title}</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Typography variant="body1"><strong>행사 장소:</strong> {post.locate}</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Typography variant="body1"><strong>업체명:</strong> {post.companyName}</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Typography variant="body1"><strong>담당 디자이너:</strong> {post.designer}</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Typography variant="body1"><strong>부스 크기:</strong> {post.boothWidth}mm x {post.boothHeight}mm</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Typography variant="body1">
//                             <strong>설치 기간:</strong> {post.installDate ? post.installDate.join(' ~ ') : "사용자가 설정한 설치 기간이 없습니다."}
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Typography variant="h6">내용</Typography>
//                         <Divider />
//                         <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', mt: 2 }}>
//                             <Typography variant="body2">{post.content}</Typography>
//                         </Box>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Typography variant="h6">외주업체 정보</Typography>
//                         <Divider />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Typography variant="body1"><strong>외주업체:</strong> {post.outsourcingName}</Typography>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Typography variant="h6">첨부 파일</Typography>
//                         <Divider />
//                         <Box>
//                             {post.fileUrls && post.fileUrls.length > 0 ? (
//                                 post.fileUrls.map((file, index) => (
//                                     <Box key={index} sx={{ mt: 1 }}>
//                                         <Typography variant="body2">
//                                             <strong>파일 {index + 1}:</strong>{' '}
//                                             <button
//                                                 onClick={() => handleDownload(file.url)}
//                                                 style={{
//                                                     background: 'none',
//                                                     border: 'none',
//                                                     color: 'black',
//                                                     textDecoration: 'underline',
//                                                     cursor: 'pointer'
//                                                 }}
//                                             >
//                                                 {decodeURIComponent(file.url.split('/').pop())} {/* 파일명을 디코딩하여 표시 */}
//                                             </button>
//                                         </Typography>
//                                     </Box>
//                                 ))
//                             ) : (
//                                 <Typography variant="body2">첨부 파일이 없습니다.</Typography>
//                             )}
//                         </Box>

//                     </Grid>
//                 </Grid>
//             </Paper >
//         </Container >
//     );
// }

import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box, Divider, Container, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticlesDetail, downloadFile, delAndnPost } from '../../api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { jwtDecode } from 'jwt-decode'; // jwt-decode 임포트
import { getToken } from '../../auth'; // 토큰 가져오는 함수

export default function PostDetail() {
    const { id } = useParams(); // URL 매개변수에서 게시물 ID 가져오기
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        getArticlesDetail(id)
            .then(response => {
                setPost(response);
                console.log("Fetched Data", response);

                // 토큰에서 사용자 ID 추출
                const token = getToken();
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const currentUserId = decodedToken.sub;

                    if (String(response.authorId) === String(currentUserId)) {
                        setIsOwner(true);
                    } else {
                        setIsOwner(false);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
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
        // 현재 게시물 데이터를 수정 페이지로 전달
        navigate(`/andn/posts/edit`, { state: { postData: post } });
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('이 글을 삭제하시겠습니까?');
        if (!confirmDelete) {
            return; // 사용자가 삭제를 취소한 경우 함수 종료
        }

        try {
            await delAndnPost(id); // 삭제 API 호출
            navigate('/andn'); // 삭제가 성공적으로 완료된 후 페이지 이동
        } catch (error) {
            console.error('게시물 삭제 중 오류 발생:', error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3, position: 'relative' }}>
                {isOwner && (
                    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                        <IconButton aria-label="edit" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
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
                            <strong>설치 기간:</strong> {post.installDate ? post.installDate.join(' ~ ') : "사용자가 설정한 설치 기간이 없습니다."}
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
                </Grid>
            </Paper >
        </Container >
    );
}
