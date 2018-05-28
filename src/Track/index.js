import React from 'react';

const Track = ({ width, color }) => (
  <div id="track" 
    style={{
      width: '100%',
      height: '100%',
      border: `${width}px solid ${color}`,
      borderRadius: '100%',
      position: 'absolute'
    }}
  />);

export default Track;