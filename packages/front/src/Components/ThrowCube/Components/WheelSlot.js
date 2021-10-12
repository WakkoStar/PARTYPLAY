import React from 'react';

import { mockRandomObject, getRandomObject } from '../helpers';
import '../style.scss';

const WheelSlot = ({ index, object, setObject, slotWheelingIndex }) => {
  const isWheeling = slotWheelingIndex == index;
  return (
    <div
      key={index}
      className={
        isWheeling ? 'throw-cube-cube-slot' : 'throw-cube-cube-wrapper'
      }
      onClick={setObject(object.id, index)}
    >
      <div>
        {isWheeling ? (
          mockRandomObject(object).map((el, index) => (
            <img key={index} src={el ? el.img : getRandomObject().img} />
          ))
        ) : (
          <img src={object.img} />
        )}
      </div>
    </div>
  );
};

export default WheelSlot;
