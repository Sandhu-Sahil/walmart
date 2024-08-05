// src/ComponentPanel.js
import React from 'react';

const ComponentPanel = ({ onSelect }) => {
  return (
    <div className="panel">
      <button onClick={() => onSelect('cube')}>Add Cube</button>
      <button onClick={() => onSelect('sphere')}>Add Sphere</button>
    </div>
  );
};

export default ComponentPanel;
