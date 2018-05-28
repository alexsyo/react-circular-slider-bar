import React from 'react';

const getPointCoordString = (r, angle) => {
  const angleRad = angle * (Math.PI / 180)
  const x = Math.cos(angleRad) * r * 100;
  const y = - Math.sin(angleRad) * r * 100;
  return `${x}px ${y}px`;
}

const getRelativeAngle = (angle, initialAngle) => (360 - angle + initialAngle) % 360

const Arc = ({r, angle, initialAngle, width, color}) => {
  const angleGrad = angle * (180 / Math.PI);
  const relativeAngle = getRelativeAngle(angleGrad, initialAngle) 

  const center = `${r + width}px ${r + width}px`;
  const start = getPointCoordString(r, initialAngle);
  const end = getPointCoordString(r, angleGrad);
  
  const extra1 = (relativeAngle > 90) ? `, ${getPointCoordString(r, getRelativeAngle(45, initialAngle))}` : '';
  const extra2 = (relativeAngle > 180) ? `, ${getPointCoordString(r, getRelativeAngle(135, initialAngle))}` : '';
  const extra3 = (relativeAngle > 270) ? `, ${getPointCoordString(r, getRelativeAngle(225, initialAngle))}` : '';

  const polygonString = `polygon(${center}, ${start}${extra1}${extra2}${extra3}, ${end})`;
  return (
    <div id="arc"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '100%',
        border: `${width}px solid ${color}`,
        position: 'absolute',
        clipPath: polygonString
      }}
    />
)}

export default Arc;