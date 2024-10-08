import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Grid, TextField, Button, Box, Checkbox, FormGroup, FormControlLabel, IconButton } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, ListItemText, OutlinedInput } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { useDropzone } from 'react-dropzone';
import { savePost, getOutsourcingUsers } from '../../api';

export default function PostView({ onPostSaved }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [locate, setLocate] = useState('');
    const [content, setContent] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [boothWidth, setBoothWidth] = useState('');
    const [boothHeight, setBoothHeight] = useState('');
    const [installDate, setInstallDate] = useState(['', '']);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [designer, setDesigner] = useState('');
    const [outsourcingOptions, setOutsourcingOptions] = useState([]);
    const [selectedOutsourcingId, setSelectedOutsourcingId] = useState([]);

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
        setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain, text/csv',
        maxSize: 3145728 // 3MB
    });

    const handleFileRemove = (fileToRemove) => {
        setSelectedFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove));
    };


    // const handleSelectionChange = (event) => {
    //   setSelectedOutsourcingIds(event.target.value);
    // };

    const handleSubmit = async () => {
        if (!title) {
            alert('행사명을 입력해주세요.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('locate', locate);
            formData.append('content', content);
            formData.append('companyName', companyName);
            formData.append('boothWidth', boothWidth);
            formData.append('boothHeight', boothHeight);
            formData.append('designer', designer);
            // formData.append('outsourcingUsers', selectedOutsourcingId);

            console.log(formData)

            // InstallDate 배열의 각 날짜를 "yyyy-MM-dd" 형식으로 변환하여 FormData에 추가
            if (installDate[0] && installDate[1]) {
                const formattedInstallDates = [
                    format(new Date(installDate[0]), 'yyyy-MM-dd'),
                    format(new Date(installDate[1]), 'yyyy-MM-dd')
                ];

                formData.append('installDate', formattedInstallDates);
            }

            selectedFiles.forEach(file => {
                console.log(file)
                formData.append('files', file);
            });

            selectedOutsourcingId.forEach(user => {
                formData.append('outsourcingId', user);
            });

            console.log('FormData 내용 확인:', formData.get('installDate'));

            await savePost(formData); // API 호출
            onPostSaved(); // 콜백 호출
            navigate('/andn');
        } catch (error) {
            console.error('게시물 저장 중 오류 발생:', error);
        }

    };



    const handleCancel = () => {
        setTitle('');
        setLocate('');
        setContent('');
        setCompanyName('');
        setBoothWidth('');
        setBoothHeight('');
        setInstallDate(['', '']);
        setSelectedFiles([]);
        setDesigner('');
        setSelectedOutsourcingId([]);
        navigate('/andn');
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="행사 장소"
                        variant="outlined"
                        fullWidth
                        value={locate}
                        onChange={(e) => setLocate(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="업체명"
                        variant="outlined"
                        fullWidth
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="담당 디자이너"
                        variant="outlined"
                        fullWidth
                        value={designer}
                        onChange={(e) => setDesigner(e.target.value)}
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
                            value={boothWidth}
                            onChange={(e) => setBoothWidth(e.target.value.replace(/[^0-9]/g, ''))}
                            required
                            sx={{ flex: 1 }}
                            autoComplete="off"
                        />
                        <Typography sx={{ mx: 1 }}>mm</Typography>
                        <Typography sx={{ mx: 3 }}>X</Typography>
                        <TextField
                            variant="outlined"
                            value={boothHeight}
                            onChange={(e) => setBoothHeight(e.target.value.replace(/[^0-9]/g, ''))}
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
                        startDate={installDate[0]}
                        endDate={installDate[1]}
                        onChange={(update) => setInstallDate(update)}
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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
                            renderValue={(selected) => selected.map(id => outsourcingOptions.find(option => option.id === id).name).join(', ')}
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




/*
필수 내용
행사명 , 행사 장소
업체명, 부스사이즈
설치기간, 행사기간, 철수기간
담당디자이너

행사 기간, 설치기간 철수 기간 모두 기간제로(~) 로 표현 달력 2개씩
TODO: 첨부파일 선택된것들 삭제하기 위한 버튼 추가필요, 부스 크기 숫자만 입력 받게끔. 기간 입력 받을때 텍스트 필드처럼 작동 안하게(자동완성)
시간 라이브러리 추가하기
*/