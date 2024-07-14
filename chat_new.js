import React, { useState } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import './chat.css';  // Ensure your CSS path is correct
import Button1Component from './Button1Component';  // Adjust this path based on your project structure
import Button2Component from './Button2Component';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);  // step 0: initial buttons, 1: input form, 2: display response
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);  // Track loading state

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
    setStep(0);  // Reset to initial step whenever chatbot is toggled
    setResponse('');  // Also clear any response
    setLoading(false);  // Reset loading state
  };

  const handleInputSubmit = (data) => {
    setLoading(false);  // Stop loading when input is submitted
    if (data && data.error) {
      setResponse(`Error: ${data.error}`);
    } else {
      setResponse(`Received: ${JSON.stringify(data)}`);  // Convert data to a string if it's an object
    }
    setStep(2);  // Move to the response view
  };

  return (
    <>
      <div className="chatbot-button" onClick={toggleChatBot}>
        💬
      </div>
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">ChatBot</div>
        <div className="chatbot-body">
          {loading ? (
            <div className="chatbot-loading">
              {/* <CircularProgress /> */}
              <p>Please wait</p>
            </div>
          ) : (
            <>
              {step === 0 && (
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button variant="contained" onClick={() => setStep(1)}>Ask for Input</Button>
                  <Button variant="contained" onClick={() => setStep(2)}>Button 2</Button>
                  <Button variant="contained" onClick={() => alert('Button 3 clicked')}>Button 3</Button>
                </Box>
              )}
              {step === 2 && <p>{response}</p>}
            </>
          )}
        </div>
        {step === 1 && (
          <div className="chatbot-footer">
            <Button1Component onInputSubmit={handleInputSubmit} setLoading={setLoading} loading={loading} />
          </div>
        )}
        {step === 2 && (
          <div className="chatbot-footer">
            <Button2Component onInputSubmit={handleInputSubmit} setLoading={setLoading} loading={loading} />
          </div>
        )}
      </div>
    </>
  );
}

export default ChatBot;
