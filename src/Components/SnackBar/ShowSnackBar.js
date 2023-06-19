import React, { useState } from 'react';
import SnackBar from './SnackBar';

const ShowSnackBar = () => {
    const [showSnackBar, setShowSnackBar] = useState(false);

    const handleButtonClick = () => {
        setShowSnackBar(true);

        // Simulating an asynchronous operation
        setTimeout(() => {
            setShowSnackBar(false);
        }, 3000);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Show SnackBar</button>
            {showSnackBar && (
                <SnackBar message="Operation completed" onClose={() => setShowSnackBar(false)} />
            )}
        </div>
    );
};

export default ShowSnackBar;