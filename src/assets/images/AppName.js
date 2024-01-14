import React from 'react';

function LineThroughZ() {
  const lineThroughStyle = {
    textDecoration: 'line-through',
    color: 'yellow',
  };

  return (
    <div>
      <span style={lineThroughStyle}>CirLo</span>
      Z
    </div>
  );
}

export default LineThroughZ;
