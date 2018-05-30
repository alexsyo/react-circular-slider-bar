import React from 'react';

const ThumbImage = ({ diameter, color, borderWidth, borderColor }) => (
  <div id="thumb-image"
    style={{
      width: diameter,
      height: diameter,
      backgroundColor: color,
      border: `${borderWidth}px solid ${borderColor}`,
      borderRadius: '100%',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute'
    }}
  />
)

const Thumb = ({ diameter, color, borderWidth, borderColor, position, handleMouseDown }) => (
  <div id="thumb"
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y
    }}
    draggable={false}
    onMouseDown={() => handleMouseDown()}
  >
    <ThumbImage 
      diameter={diameter}
      color={color}
      borderWidth={borderWidth}
      borderColor={borderColor}
    />
  </div>);

export default Thumb;