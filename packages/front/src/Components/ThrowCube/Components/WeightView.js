import React from 'react';
import '../style.scss';

const WeigthView = ({ object, slotWheelingIndex, index }) => {
  return (
    <div className="throw-cube-weight-container">
      <div
        style={{
          width: `${object.weight * (100 / 3)}%`,
          opacity: `${slotWheelingIndex == index ? '0' : '1'}`,
        }}
      >
        <img src={require('../../assets/throwcube/weights.png').default} />
      </div>
    </div>
  );
};

export default WeigthView;
