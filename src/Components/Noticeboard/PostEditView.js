import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, Typography, Grid, TextField, Button, Box, Checkbox, FormGroup, FormControlLabel, IconButton } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, ListItemText, OutlinedInput } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { useDropzone } from 'react-dropzone';
import { patchAndnPost, getOutsourcingUsers } from '../../api';

export default function PostEditView({ onPostSaved }) {
    const navigate = useNavigate();

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

    const [outsourcingOptions, setOutsourcingOptions] = useState([]);
    const [selectedOutsourcingId, setSelectedOutsourcingId] = useState(
        postData?.outsourcingUsers?.map(user => user.outsourcingId) || []
    );

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

            if (postData.installDate && postData.installDate[0] && postData.installDate[1]) {
                const formattedInstallDates = [
                    format(new Date(postData.installDate[0]), 'yyyy-MM-dd'),
                    format(new Date(postData.installDate[1]), 'yyyy-MM-dd')
                ];
                formData.append('installDate', formattedInstallDates);
            }

            selectedFiles.forEach(file => {
                if (file.file instanceof File) {
                    formData.append('files', file.file);
                }
            });

            // Add files to delete
            if (filesToDelete.length > 0) {
                formData.append('filesToDelete', filesToDelete);
            }

            selectedOutsourcingId.forEach(user => {
                formData.append('outsourcingId', user); // Assuming `outsourcingId` is used in form submission
            });
            console.log('FormData Entries:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            // formData.append('outsourcingUsers', 7);
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
                        onChange={(e) => setPostData({ ...postData, locate: e.target.value })}
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
                        startDate={postData.installDate != null ? postData.installDate[0] : null}
                        endDate={postData.installDate != null ? postData.installDate[1] : null}
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
                    <FormControl variant="outlined" fullWidth required>
                        <InputLabel>외주업체 선택</InputLabel>
                        <Select
                            multiple
                            value={selectedOutsourcingId}
                            onChange={(e) => setSelectedOutsourcingId(e.target.value)}
                            input={<OutlinedInput label="외주업체 선택" />}
                            renderValue={(selected) =>
                                outsourcingOptions.length > 0
                                    ? selected.map(id => {
                                        const option = outsourcingOptions.find(option => option.id === id);
                                        return option ? option.name : '';
                                    }).join(', ')
                                    : ''
                            }
                        >
                            {outsourcingOptions.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    <Checkbox checked={selectedOutsourcingId.indexOf(option.id) > -1} />
                                    <ListItemText primary={option.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        제출
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
