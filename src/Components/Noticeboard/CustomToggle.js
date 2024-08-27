import React from 'react';
import './CustomToggle.css'; // Import the updated CSS file

function CustomToggle({ isOn, handleToggle }) {
    return (
        <div className={`toggle-container ${isOn ? 'toggle-on' : 'toggle-off'}`} onClick={handleToggle}>
            <div className="toggle-icon">{isOn ? '✔︎' : '✖︎'}</div>
            <div className="toggle-circle"></div>
        </div>
    );
}

export default CustomToggle;