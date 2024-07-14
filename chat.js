import React, { useState } from 'react';
import Button1Activity from './Button1Activity';
import Button2Activity from './Button2Activity';
import Button3Activity from './Button3Activity';
import { CircularProgress } from '@mui/material';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [activityResult, setActivityResult] = useState(null); // State to store activity result
  const [loading, setLoading] = useState(false); // State to manage loading spinner

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setStep(0);
  };

  const handleStep1Click = () => {
    setStep(1);
  };

  const handleActivitySubmit = (result) => {
    // Handle activity result here (e.g., make API call, update state, etc.)
    console.log('Activity result:', result);
    setActivityResult(result); // Store activity result in state
    setStep(0); // Reset step after activity completion
  };

  return (
    <>
      <div className="chatbot-button" onClick={handleButtonClick}>
        💬
      </div>
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          ChatBot
        </div>
        <div className="chatbot-body">
          {loading ? (
            <div className="chatbot-loading">
              <CircularProgress />
              <p>Please wait...</p>
            </div>
          ) : (
            <>
              {step === 0 && (
                <>
                  <Button1Activity onSubmit={handleActivitySubmit} setLoading={setLoading} />
                  <Button2Activity onSubmit={handleActivitySubmit} />
                  <Button3Activity onSubmit={handleActivitySubmit} />
                </>
              )}
              {step === 1 && (
                <div style={{ flexGrow: 1 }}>
                  {/* Additional UI or logic for step 1 */}
                </div>
              )}
              {activityResult && ( // Display activity result if available
                <div>
                  <h3>Activity Result:</h3>
                  <pre>{JSON.stringify(activityResult, null, 2)}</pre>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatBot;
