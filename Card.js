import React from 'react';
import './CardWithButton.css';

const Card = ({ header, body }) => {
  return (
    <div className="card">
      <div className="header">{header}</div>
      <div className="body">{body}</div>
    </div>
  );
};

export default Card;
