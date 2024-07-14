// Button1Activity.js
import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Checkbox, FormControlLabel } from '@mui/material';

const Button1Activity = ({ onSubmit, setLoading }) => {
  const [formData, setFormData] = useState({
    inputValue: '',
    checkboxValue: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const url = `https://jsonplaceholder.typicode.com/posts/${formData.inputValue}`; // Sample GET endpoint
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onSubmit(data); // Pass response to parent component (ChatBot)
    } catch (error) {
      console.error('Error fetching data:', error);
      onSubmit(null); // Clear response on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter value"
          name="inputValue"
          value={formData.inputValue}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="checkboxValue"
              checked={formData.checkboxValue}
              onChange={handleChange}
            />
          }
          label="Checkbox"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Form
        </Button>
      </form>
    </div>
  );
};

export default Button1Activity;
