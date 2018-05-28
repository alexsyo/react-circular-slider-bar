import React from 'react';

const Arc = ({r, angle, width, color}) => {
  const angleGrad = angle * 57.2957795
  
  const center = `${r + width}px ${r + width}px`;
  const start = `${r + width}px ${0}px`;
  const x = Math.cos(angle) * 57.2957795 * 100;
  const y = - Math.sin(angle) * 57.2957795 * 100;
  const end = `${x}px ${y}px`;
  
  const extra1 = (angleGrad > 90) ? `,${(r + width) * 2}px 0px` : '';
  const extra3 = (angleGrad > 90 && angleGrad < 270) ? `, 0px ${(r + width) * 2}px` : '';
  const extra4 = (angleGrad > 90) ? `,${(r + width) * 2}px ${(r + width) * 2}px` : '';
  return (
    <div id="arc"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '100%',
        border: `${width}px solid ${color}`,
        position: 'absolute',
        clipPath: `polygon(${center}, ${start}${extra1}${extra4}${extra3}, ${end})`
      }}
    />
)}

export default Arc;