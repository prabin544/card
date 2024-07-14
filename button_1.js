import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';

function Button1Component({ onInputSubmit, setLoading, loading }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);  // Start loading before making the API call
        try {
            const url = `https://jsonplaceholder.typicode.com/posts/${inputValue}`; // Customize the URL as needed
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            onInputSubmit(data);  // Send the data back to the parent component
            setInputValue('');   // Clear input field after successful operation
        } catch (error) {
            console.error('Error fetching data:', error);
            onInputSubmit({ error: error.message });  // Send error message to the parent
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', padding: '10px', width: '100%' }}>
            <TextField
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant="outlined"
                placeholder="Enter post ID"
                size="small"
                disabled={loading}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '8px' }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
        </form>
    );
}

export default Button1Component;
