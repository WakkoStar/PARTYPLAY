import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { goBack } from '../../redux/historySlice';
import ROUTES from '../../routes';
import socket from '../../utils/socket';

import WheelSlot from './Components/WheelSlot';
import { initialState } from './data';
import { getRandomObject } from './helpers';
import './style.scss';

const ThrowCube = () => {
  const dispatch = useDispatch();
  const me = useSelector(state => state.me.value);

  const [slotWheelingIndex, setSlotWheelingIndex] = useState(-1);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [myObjects, setMyObjects] = useState(initialState);

  const setObject =
    (selectedIndex = 0, myObjectsIndex) =>
    () => {
      if (!isMyTurn) return;

      socket.emit(ROUTES.SET_OBJECT, {
        code: me.code,
        indexObject: selectedIndex,
      });

      const myObjectsClone = myObjects;
      myObjectsClone[myObjectsIndex] = getRandomObject();
      setMyObjects(myObjectsClone);
      setIsMyTurn(false);
      setSlotWheelingIndex(myObjectsIndex);
      setTimeout(() => setSlotWheelingIndex(-1), 1000);
    };

  useEffect(() => {
    const updateRoute = path => {
      if (path == '') dispatch(goBack());
    };
    const askObject = playerName => {
      if (me.name === playerName) {
        setIsMyTurn(true);
      }
    };
    setMyObjects([getRandomObject(), getRandomObject(), getRandomObject()]);

    socket.on(ROUTES.UPDATE_ROUTE, updateRoute);
    socket.on(ROUTES.ASK_OBJECT, askObject);
    return () => {
      socket.off(ROUTES.UPDATE_ROUTE, updateRoute);
      socket.off(ROUTES.ASK_OBJECT, askObject);
    };
  }, [dispatch]);

  return (
    <div className={isMyTurn ? 'throw-cube' : 'throw-cube-disabled'}>
      <h1>{isMyTurn ? "C'est votre tour ! " : 'Attendez votre tour.'}</h1>
      <div className="throw-cube-cube-container">
        {myObjects.map((object, index) => (
          <div className="throw-cube-cube-div" key={index}>
            <div className="throw-cube-weight-container">
              <div
                style={{
                  width: `${object.weight * (100 / 3)}%`,
                  opacity: `${slotWheelingIndex == index ? '0' : '1'}`,
                }}
              >
                <img
                  src={require('../../assets/throwcube/weights.png').default}
                />
              </div>
            </div>
            <WheelSlot
              index={index}
              object={object}
              slotWheelingIndex={slotWheelingIndex}
              setObject={setObject}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThrowCube;
