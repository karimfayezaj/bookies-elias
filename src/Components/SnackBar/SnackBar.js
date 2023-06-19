import React from 'react';
import './SnackBar.css'; // Import the CSS file for styling

const SnackBar = ({ message, onClose }) => {
    return (
        <div className="snackbar">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default SnackBar;