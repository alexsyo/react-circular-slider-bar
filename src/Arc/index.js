import React from 'react';
import {
  pipe,
  toRad,
  getRelativeAngle
 } from '../utils';

const getPointCoordString = (r, angle) => {
  const x = Math.cos(toRad(angle)) * r * 100;
  const y = - Math.sin(toRad(angle)) * r * 100;
  return `${x}px ${y}px`;
}

const Arc = ({r, angle, initialAngle, width, color}) => {
  const relativeAngle = getRelativeAngle(angle, initialAngle) 

  const center = `${r + width}px ${r + width}px`;
  const start = getPointCoordString(r, initialAngle);
  const end = getPointCoordString(r, angle);
  
  const extraPoint1 = pipe(
    getRelativeAngle(45, initialAngle), 
    a => getPointCoordString(r, a));
  const extraPoint2 = pipe(
    getRelativeAngle(135, initialAngle),
    a => getPointCoordString(r, a));
  const extraPoint3 = pipe(
    getRelativeAngle(225, initialAngle),
    a => getPointCoordString(r, a));
  
  const extra1 = (relativeAngle > 90) ? `, ${extraPoint1}` : '';
  const extra2 = (relativeAngle > 180) ? `, ${extraPoint2}` : '';
  const extra3 = (relativeAngle > 270) ? `, ${extraPoint3}` : '';

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