import React, { useState, useCallback } from 'react';
import { Paper, Typography, Grid, TextField, Button, Box, Container, Divider } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

export default function ClientPostView() {
    const [eventName, setEventName] = useState(''); //행사명    
    const [companyName, setCompanyName] = useState(''); //업체명
    const [manager, setManager] = useState(''); // 담당자
    const [callNumber, setCallNumber] = useState('');   //연락처
    const [location, setLocation] = useState('');   //행사 장소
    const [boothLayout, setBoothLayout] = useState(''); //부스배치도
    const [boothmanager, setBoothmanager] = useState(''); // 부스 담당자
    const [boothcallNumber, setBoothcallNumber] = useState('');   //연락처
    const [installDate, setInstallDate] = useState(null);   //설치일자
    const [removeDate, setRemoveDate] = useState(null); // 철수일자
    const [selectedFiles, setSelectedFiles] = useState([]); //첨부파일
    const [applicant, setApplicant] = useState('');//신청자
    const [applicantNum, setApplicantNum] = useState('');//신청자 연락처
    const [collectionDay, setCollectionDay] = useState('');//수거일시
    const [collectionLoc, setCollectionLoc] = useState('');//수거장소
    const [memo, setMemo] = useState('');//메모

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*, application/pdf', maxSize: 3145728 });

    const handleSubmit = () => {
        console.log({
            eventName, companyName, manager, callNumber, location, boothLayout, boothmanager, boothcallNumber,
            installDate, removeDate, selectedFiles, applicant, applicantNum, collectionDay, collectionLoc, memo
        });
    };

    const handleCancel = () => {
        setEventName('');
        setCompanyName('');
        setManager('');
        setCallNumber('');
        setLocation('');
        setBoothLayout('');
        setBoothmanager('');
        setBoothcallNumber('');
        setInstallDate(null);
        setRemoveDate(null);
        setSelectedFiles([]);
        setApplicant('');
        setApplicantNum('');
        setCollectionDay('');
        setCollectionLoc('');
        setMemo('');
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
                            value={boothmanager}
                            onChange={(e) => setBoothmanager(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="연락처"
                            variant="outlined"
                            fullWidth
                            value={boothcallNumber}
                            onChange={(e) => setBoothcallNumber(e.target.value)}
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
                                    <Typography key={index} variant="body2">
                                        선택된 파일: {file.name}
                                    </Typography>
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
                    <Grid item xs={12}>
                        <TextField
                            label="수거일시"
                            variant="outlined"
                            fullWidth
                            value={collectionDay}
                            onChange={(e) => setCollectionDay(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={12}>
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