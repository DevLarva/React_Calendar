import React, { useState, useCallback, useEffect } from 'react';
import { Paper, Typography, Grid, TextField, Button, Box, Container, Divider, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { saveClientPost } from '../../api'; // Assuming saveClientPost is an API function you have set up

export default function ClientPostView({ onClientPostSaved }) {
    const [eventName, setEventName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [manager, setManager] = useState('');
    const [callNumber, setCallNumber] = useState('');
    const [location, setLocation] = useState('');
    const [boothLayout, setBoothLayout] = useState('');
    const [boothManager, setBoothManager] = useState('');
    const [boothCallNumber, setBoothCallNumber] = useState('');
    const [installDate, setInstallDate] = useState('');
    const [removeDate, setRemoveDate] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [applicant, setApplicant] = useState('');
    const [applicantNum, setApplicantNum] = useState('');
    const [collectionDay, setCollectionDay] = useState('');       //확인 요망
    const [collectionLoc, setCollectionLoc] = useState('');         //확인 요망
    const [memo, setMemo] = useState('');
    const navigate = useNavigate();

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

    const handleSubmit = async () => {

        if (!eventName || !companyName) {
            alert('필수 항목을 입력해주세요.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('eventName', eventName);
            formData.append('companyName', companyName);
            formData.append('manager', manager);
            formData.append('callNumber', callNumber);
            formData.append('location', location);
            formData.append('boothLayout', boothLayout);
            formData.append('boothManager', boothManager);
            formData.append('boothCallNumber', boothCallNumber);
            if (installDate) formData.append('installDate', installDate);
            // formData.append('installDate', installDate);
            if (removeDate) formData.append('removeDate', removeDate);
            formData.append('applicant', applicant);
            formData.append('applicantNum', applicantNum);
            if (collectionDay) formData.append('collectionDay', collectionDay);
            formData.append('collectionLoc', collectionLoc);
            formData.append('memo', memo);

            if (selectedFiles) selectedFiles.forEach(file => {
                formData.append('files', file);
            });

            await saveClientPost(formData);
            console.log('게시물이 성공적으로 저장되었습니다');
            onClientPostSaved();
            navigate('/client');

        } catch (error) {
            console.error('게시물 저장 중 오류 발생:', error);
        }
    };

    const handleCancel = () => {
        setEventName('');
        setCompanyName('');
        setManager('');
        setCallNumber('');
        setLocation('');
        setBoothLayout('');
        setBoothManager('');
        setBoothCallNumber('');
        setInstallDate('');
        setRemoveDate('');
        setSelectedFiles([]);
        setApplicant('');
        setApplicantNum('');
        setCollectionDay('');
        setCollectionLoc('');
        setMemo('');
        navigate('/client');
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
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <TextField
                            label="담당자"
                            variant="outlined"
                            fullWidth
                            value={manager}
                            onChange={(e) => setManager(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="연락처"
                            variant="outlined"
                            fullWidth
                            value={callNumber}
                            onChange={(e) => setCallNumber(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="행사 장소"
                            variant="outlined"
                            fullWidth
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="부스 배치도"
                            variant="outlined"
                            fullWidth
                            value={boothLayout}
                            onChange={(e) => setBoothLayout(e.target.value)}
                            required
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
                            value={boothManager}
                            onChange={(e) => setBoothManager(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="연락처"
                            variant="outlined"
                            fullWidth
                            value={boothCallNumber}
                            onChange={(e) => setBoothCallNumber(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            locale={ko}
                            selected={installDate}
                            onChange={(date) => setInstallDate(date)}
                            dateFormat="yyyy/MM/dd"
                            customInput={<TextField fullWidth label="설치 예정일시" variant="outlined" />}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            locale={ko}
                            selected={removeDate}
                            onChange={(date) => setRemoveDate(date)}
                            dateFormat="yyyy/MM/dd"
                            customInput={<TextField fullWidth label="철거 예정일시" variant="outlined" />}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">그래픽 신청 내역</Typography>
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
                        <Typography variant="h6">물품 픽업</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="신청인"
                            variant="outlined"
                            fullWidth
                            value={applicant}
                            onChange={(e) => setApplicant(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="연락처"
                            variant="outlined"
                            fullWidth
                            value={applicantNum}
                            onChange={(e) => setApplicantNum(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            locale={ko}
                            selected={collectionDay}
                            onChange={(date) => setCollectionDay(date)}
                            dateFormat="yyyy/MM/dd"
                            customInput={<TextField fullWidth label="보관 일시" variant="outlined" />}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="수거장소"
                            variant="outlined"
                            fullWidth
                            value={collectionLoc}
                            onChange={(e) => setCollectionLoc(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="메모"
                            variant="outlined"
                            fullWidth
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            multiline
                            rows={4}
                            autoComplete="off"
                        />
                    </Grid>
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



/*
Client
- 행사명, 업체명, 담당자, 연락처, 장소, 부스 배치도
부스담당자
- 담당자, 연락처, 행사일시, 부스 사이즈, 설치 담당자, 설치 담당자 연락처, 설치예정일시, 철거예정일시
그래픽 신청 내역
(이미지 첨부)
물품 픽업

달력 수정
TODO: 물품 픽업 관련 변수 추가
*/