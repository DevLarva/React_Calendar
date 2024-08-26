import React from 'react';
import { Button, Box, Typography } from '@mui/material';

export default function NewPostButton({ onClick }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
                color="primary"
                variant="contained"
                onClick={onClick}
            >
                <Typography variant="body1">
                    글작성
                </Typography>

            </Button>
        </Box>
    );
}
