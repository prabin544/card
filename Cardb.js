import React, { useState } from 'react';
import './CardWithButton.css';
import { FaCopy } from 'react-icons/fa';

const Card = ({ header, body }) => (
  <div className="card">
    <div className="card-header">{header}</div>
    <div className="card-body">{body}</div>
  </div>
);

const CardWithButton = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Use multiple posts for testing
      const result = await response.json();
      setData(JSON.stringify(result, null, 2)); // Format JSON for better readability
      setDataFetched(true); // Mark data as fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setData('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(data).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="container">
      <div>
        <Card header="Card 1 Header" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." />
        <Card header="Card 2 Header" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." />
      </div>
      <div className="main-card">
        {!loading && !dataFetched && (
          <div className="button-container">
            <button onClick={handleButtonClick} className="button">
              Fetch Data
            </button>
          </div>
        )}
        {loading && <div className="spinner"></div>}
        <pre>{data}</pre>
        {dataFetched && (
          <div className="copy-icon-container" onClick={handleCopyClick}>
            <FaCopy className="copy-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardWithButton;
