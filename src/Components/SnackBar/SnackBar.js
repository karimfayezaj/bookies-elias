import React from 'react';
import './SnackBar.css'; // Import the CSS file for styling

const SnackBar = ({ message }) => {
    return (
        <div className="snackbar">
            <p>{message}</p>
        </div>
    );
};

export default SnackBar;