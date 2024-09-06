import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, Typography, Grid, TextField, Button, Box, Divider, Container, IconButton } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, ListItemText, OutlinedInput } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { useDropzone } from 'react-dropzone';
import { patchClientPost } from '../../api';
import CustomToggle from './CustomToggle';


export default function ClientEditView({ onPostSaved }) {
    const navigate = useNavigate();
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    }

    // 접두사 부분을 제거하는 함수
    const removePrefix = (filename) => {
        const parts = filename.split('_');
        if (parts.length > 1) {
            return parts.slice(1).join('_'); // 첫 번째 부분을 제거하고 나머지 부분을 합침
        }
        return filename; // 접두사가 없는 경우 원래 파일명 반환
    };

    const location = useLocation();
    const [postData, setPostData] = useState(location.state?.postData || null);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filesToDelete, setFilesToDelete] = useState([]);

    //   const [outsourcingOptions, setOutsourcingOptions] = useState([]);
    //   const [selectedOutsourcingId, setSelectedOutsourcingId] = useState(
    //     postData?.outsourcingUsers?.map(user => user.outsourcingId) || []
    // );

    useEffect(() => {
        if (location.state?.postData) {
            setPostData(location.state.postData);
            setSelectedFiles(location.state.postData.fileUrls.map(fileUrl => ({
                id: fileUrl.id,
                name: removePrefix(decodeURIComponent(fileUrl.url.split('/').pop())),
                url: fileUrl.url,
            })));
        }
    }, [location.state]);

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles.map(file => ({
                file,
                name: file.name,
                url: URL.createObjectURL(file),
            }))
        ]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain, text/csv',
        maxSize: 3145728 // 3MB 
    });

    const handleFileRemove = (fileToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
        if (fileToRemove.id) {
            setFilesToDelete(prevFiles => [...prevFiles, fileToRemove.id]);
            console.log("삭제 글 id", fileToRemove);
        }
    };

    const handleSubmit = async () => {
        if (!postData.eventName) {
            alert('행사명을 입력해주세요.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('eventName', postData.eventName);
            formData.append('companyName', postData.companyName);
            formData.append('manager', postData.manager);
            formData.append('callNumber', postData.callNumber);
            formData.append('location', postData.location);
            formData.append('boothLayout', postData.boothLayout);
            formData.append('boothManager', postData.boothManager);
            formData.append('boothCallNumber', postData.boothCallNumber);
            formData.append('applicant', postData.applicant);
            formData.append('applicantNum', postData.applicantNum);
            formData.append('collectionDay', postData.collectionDay);
            formData.append('collectionLoc', postData.collectionLoc);
            formData.append('memo', postData.memo);

            if (postData.installDate) {
                const formattedInstallDate = [
                    format(new Date(postData.installDate), 'yyyy-MM-dd')
                ];
                formData.append('installDate', formattedInstallDate);
            }

            if (postData.removeDate) {
                const formattedInstallDate = [
                    format(new Date(postData.removeDate), 'yyyy-MM-dd')
                ];
                formData.append('removeDate', formattedInstallDate);
            }

            selectedFiles.forEach(file => {
                if (file.file instanceof File) {
                    formData.append('files', file.file);
                }
            });

            if (filesToDelete.length > 0) {
                formData.append('filesToDelete', filesToDelete);
            }

            await patchClientPost(postData.id, formData); // API 호출

            // onPostSaved(); // 콜백 호출
            navigate(`/client/posts/${postData.id}`);
        } catch (error) {
            console.error('게시물 저장 중 오류 발생:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/client/posts/${postData.id}`);
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    WORK SHEET
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Client</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="행사명"
                            variant="outlined"
                            fullWidth
                            value={postData.eventName}
                            onChange={(e) => setPostData({ ...postData, eventName: e.target.value })}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="업체명"
                            variant="outlined"
                            fullWidth
                            value={postData.companyName}
                            onChange={(e) => setPostData({ ...postData, companyName: e.target.value })}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="담당자"
                            variant="outlined"
                            fullWidth
                            value={postData.manager}
                            onChange={(e) => setPostData({ ...postData, manager: e.target.value })}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="연락처"
                            variant="outlined"
                            fullWidth
                            value={postData.callNumber}
                            onChange={(e) => setPostData({ ...postData, callNumber: e.target.value })}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="행사 장소"
                            variant="outlined"
                            fullWidth
                            value={postData.location}
                            onChange={(e) => setPostData({ ...postData, location: e.target.value })}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">부스 담당자</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="담당자"
                            variant="outlined"
                            fullWidth
                            value={postData.boothManager}
                            onChange={(e) => setPostData({ ...postData, boothManager: e.target.value })}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="연락처"
                            variant="outlined"
                            fullWidth
                            value={postData.boothCallNumber}
                            onChange={(e) => setPostData({ ...postData, boothCallNumber: e.target.value })}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            locale={ko}
                            selected={postData.installDate}
                            onChange={(date) => setPostData({ ...postData, installDate: date })}
                            dateFormat="yyyy/MM/dd"
                            customInput={<TextField fullWidth label="설치 예정일시" variant="outlined" />}
                            autoComplete="off"
                            placeholderText="선택하지 않음"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            locale={ko}
                            selected={postData.removeDate}
                            onChange={(date) => setPostData({ ...postData, removeDate: date })}
                            dateFormat="yyyy/MM/dd"
                            customInput={<TextField fullWidth label="철거 예정일시" variant="outlined" />}
                            autoComplete="off"
                            placeholderText="선택하지 않음"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">파일 첨부</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ my: 2, p: 2, border: '2px dashed #ccc', borderRadius: '4px', textAlign: 'center' }} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <CloudUploadIcon sx={{ fontSize: 48, color: '#ccc' }} />
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                클릭 혹은 파일을 이곳에 드롭하세요.
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                                파일당 최대 3MB
                            </Typography>
                        </Box>
                        {selectedFiles.length > 0 && (
                            <Box mt={2}>
                                {selectedFiles.map((file, index) => (
                                    <Box key={index} display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant="body2">
                                            {file.name}
                                        </Typography>
                                        <IconButton onClick={() => handleFileRemove(file)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ paddingBottom: '16px' }} >
                            <Typography variant="h6">물품 픽업</Typography>
                            <CustomToggle isOn={isToggled}
                                handleToggle={handleToggle}

                            />
                        </Box>
                        <Divider />
                    </Grid>

                    {isToggled && (
                        <>
                            <Grid item xs={6}>
                                <TextField
                                    label="신청인"
                                    variant="outlined"
                                    fullWidth
                                    value={postData.applicant}
                                    onChange={(e) => setPostData({ ...postData, applicant: e.target.value })}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="연락처"
                                    variant="outlined"
                                    fullWidth
                                    value={postData.applicantNum}
                                    onChange={(e) => setPostData({ ...postData, applicantNum: e.target.value })}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    locale={ko}
                                    selected={postData.collectionDay}
                                    onChange={(date) => setPostData({ ...postData, collectionDay: date })}
                                    dateFormat="yyyy/MM/dd"
                                    customInput={<TextField fullWidth label="보관 일시" variant="outlined" />}
                                    autoComplete="off"
                                    placeholderText="선택하지 않음"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="수거장소"
                                    variant="outlined"
                                    fullWidth
                                    value={postData.collectionLoc}
                                    onChange={(e) => setPostData({ ...postData, collectionLoc: e.target.value })}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="메모"
                                    variant="outlined"
                                    fullWidth
                                    value={postData.memo}
                                    onChange={(e) => setPostData({ ...postData, memo: e.target.value })}
                                    multiline
                                    rows={4}
                                    autoComplete="off"
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleSubmit}
                        >
                            제출
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={handleCancel}
                        >
                            취소
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}