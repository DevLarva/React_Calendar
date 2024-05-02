import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateRangePicker({ selectedStartDate, selectedEndDate, onChangeStartDate, onChangeEndDate }) {
    const [startDate, setStartDate] = useState(selectedStartDate);
    const [endDate, setEndDate] = useState(selectedEndDate);

    const handleStartDateChange = date => {
        setStartDate(date);
        onChangeStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
        onChangeEndDate(date);
    };

    return (
        <div className="flex items-center">
            <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <span className="mx-2">~</span>
            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />
        </div>
    );
}