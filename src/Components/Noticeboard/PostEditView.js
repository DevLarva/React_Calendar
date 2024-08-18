import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, Typography, Grid, TextField, Button, Box, Checkbox, FormGroup, FormControlLabel, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { useDropzone } from 'react-dropzone';
import { patchAndnPost, getOutsourcingUsers } from '../../api';

export default function PostEditView({ onPostSaved }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [postData, setPostData] = useState(location.state?.postData || {});
    const [selectedFiles, setSelectedFiles] = useState(location.state?.postData.files || {});
    const [outsourcingOptions, setOutsourcingOptions] = useState([]);

    useEffect(() => {
        if (location.state?.postData) {
            setPostData(location.state.postData);
        }
    }, [location.state]);

    useEffect(() => {
        // Fetch outsourcing options
        getOutsourcingUsers()
            .then(response => {
                setOutsourcingOptions(response);
            })
            .catch(error => {
                console.error('Error fetching outsourcing options:', error);
            });
    }, []);
    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFiles((prevFiles) => {
            const newFiles = [...prevFiles, ...acceptedFiles];
            setPostData((prevData) => ({ ...prevData, files: newFiles }));
            return newFiles;
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*, application/pdf',
        maxSize: 3145728 // 3MB
    });

    const handleFileRemove = (fileToRemove) => {
        setSelectedFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter(file => file !== fileToRemove);
            setPostData((prevData) => ({ ...prevData, files: updatedFiles }));
            return updatedFiles;
        });
    };

    const handleSubmit = async () => {
        if (!postData.title) {
            alert('행사명을 입력해주세요.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('title', postData.title);
            formData.append('locate', postData.locate);
            formData.append('companyName', postData.companyName);
            formData.append('designer', postData.designer);
            formData.append('boothWidth', postData.boothWidth);
            formData.append('boothHeight', postData.boothHeight);
            formData.append('content', postData.content);
            formData.append('outsourcingId', postData.outsourcingId);

            if (postData.installDate[0] && postData.installDate[1]) {
                const formattedInstallDates = [
                    format(new Date(postData.installDate[0]), 'yyyy-MM-dd'),
                    format(new Date(postData.installDate[1]), 'yyyy-MM-dd')
                ];

                formData.append('installDate', formattedInstallDates);
            }

            //   selectedFiles.forEach(file => {
            //     formData.append('files', file);
            // });
            await patchAndnPost(postData.id, formData); // API 호출
            // onPostSaved(); // 콜백 호출
            navigate(`/andn/posts/${postData.id}`);
        } catch (error) {
            console.error('게시물 저장 중 오류 발생:', error);
        }

    };

    const handleCancel = () => {
        navigate(`/andn/posts/${postData.id}`);
    };


    return (
        <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                글 작성
            </Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="외주업체 공유" />
            </FormGroup>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="행사명"
                        variant="outlined"
                        fullWidth
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        required
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="행사 장소"
                        variant="outlined"
                        fullWidth
                        value={postData.locate}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        required
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="업체명"
                        variant="outlined"
                        fullWidth
                        value={postData.companyName}
                        onChange={(e) => setPostData({ ...postData, companyName: e.target.value })}
                        required
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="담당 디자이너"
                        variant="outlined"
                        fullWidth
                        value={postData.designer}
                        onChange={(e) => setPostData({ ...postData, designer: e.target.value })}
                        required
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        부스 크기
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <TextField
                            variant="outlined"
                            value={postData.boothWidth}
                            onChange={(e) => setPostData({ ...postData, boothWidth: e.target.value })}
                            required
                            sx={{ flex: 1 }}
                            autoComplete="off"
                        />
                        <Typography sx={{ mx: 1 }}>mm</Typography>
                        <Typography sx={{ mx: 3 }}>X</Typography>
                        <TextField
                            variant="outlined"
                            value={postData.boothHeight}
                            onChange={(e) => setPostData({ ...postData, boothHeight: e.target.value.replace(/[^0-9]/g, '') })}
                            required
                            sx={{ flex: 1 }}
                            autoComplete="off"
                        />
                        <Typography sx={{ mx: 1 }}>mm</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <DatePicker
                        locale={ko}
                        selectsRange
                        startDate={postData.installDate[0]}
                        endDate={postData.installDate[1]}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setPostData({ ...postData, installDate: [start, end] });
                        }}
                        dateFormat="yyyy/MM/dd"
                        customInput={<TextField fullWidth label="설치 기간" variant="outlined" />}
                        autoComplete="off"
                    />
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
                    <TextField
                        label="내용"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={postData.content}
                        onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                        required
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        variant="outlined"
                        fullWidth
                        value={postData.outsourcingId}
                        onChange={(e) => setPostData({ ...postData, outsourcingId: e.target.value })}
                        SelectProps={{
                            native: true,
                        }}
                        required
                        autoComplete="off"
                    >
                        <option value="">외주업체 선택</option>
                        {outsourcingOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        수정 완료
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
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
    );
}