import React from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
    const navigate = useNavigate();

    const goBack = () => {
        if (window.history.length === 1) {
            window.close();
        } else {
            navigate(-1); // Equivalent to goBack()
        }
    };

    return (
        <Button color="primary" className='goBackButton' onClick={goBack} style={{ fontSize: '15px', padding: '10px 20px' }}>
            {window.history.length === 1 ? 'Close' : 'Go Back'}
        </Button>
    );
};

export default GoBack;