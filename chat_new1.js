import React, { useState } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning'; // Import Warning Icon
import ErrorIcon from '@mui/icons-material/Error'; // Import Error Icon
import './chat.css';  // Ensure your CSS path is correct
import Button1Component from './Button1Component';  // Adjust this path based on your project structure

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);  // step 0: initial buttons, 1: input form
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);  // Track loading state

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
    setStep(0);  // Reset to initial step whenever chatbot is toggled
    setResponse([]);  // Also clear any response
    setLoading(false);  // Reset loading state
  };

  const handleInputSubmit = (formattedResponse) => {
    setResponse(formattedResponse);
    setLoading(false);  // Stop loading
    setStep(1);  // Maintain step 1 for new input
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
              <CircularProgress />
              <p>Please wait</p>
            </div>
          ) : (
            <>
              {step === 0 && (
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button variant="contained" onClick={() => setStep(1)}>Ask for Input</Button>
                  <Button variant="contained" onClick={() => alert('Button 2 clicked')}>Button 2</Button>
                  <Button variant="contained" onClick={() => alert('Button 3 clicked')}>Button 3</Button>
                </Box>
              )}
              {response.length > 0 && (
                <div className="chatbot-response">
                  {response.map((res, index) => (
                    <div className={`response-block ${res.type}`} key={index}>
                      {res.type === 'success' && <CheckCircleIcon className="response-icon success" />}
                      {res.type === 'warning' && <WarningIcon className="response-icon warning" />}
                      {res.type === 'error' && <ErrorIcon className="response-icon error" />}
                      <p>{res.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {step === 1 && (
          <div className="chatbot-footer">
            <Button1Component onInputSubmit={handleInputSubmit} setLoading={setLoading} loading={loading} />
          </div>
        )}
      </div>
    </>
  );
}

export default ChatBot;
