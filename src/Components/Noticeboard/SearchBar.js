import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function SearchBar({ searchQuery, setSearchQuery, searchCriteria, setSearchCriteria }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [placeholder, setPlaceholder] = useState('제목 검색');

    useEffect(() => {
        if (searchCriteria === 'title') {
            setPlaceholder('제목 검색');
        } else if (searchCriteria === 'author') {
            setPlaceholder('작성자 검색');
        }
    }, [searchCriteria]);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSelectCriteria = (criteria) => {
        setSearchCriteria(criteria);
        handleCloseMenu();
    };

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <TextField
                label={placeholder}
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton
                aria-label="filter"
                onClick={handleOpenMenu}
                style={{ position: 'absolute', right: 0 }}
            >
                <FilterListIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={() => handleSelectCriteria('title')}>제목</MenuItem>
                <MenuItem onClick={() => handleSelectCriteria('author')}>작성자</MenuItem>
            </Menu>
        </div>
    );
};