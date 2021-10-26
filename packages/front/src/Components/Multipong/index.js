import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { goBack } from '../../redux/historySlice';
import ROUTES from '../../routes';
import socket from '../../utils/socket';

import { getMyPlayerColor } from './helpers';
import './style.scss';

const MultiPong = () => {
  const dispatch = useDispatch();
  const [pos, setPos] = useState(undefined);
  const me = useSelector(state => state.me.value);
  const players = useSelector(state => state.players.value);

  const sendPosition = newPos => () => {
    if (pos === newPos) return;
    setPos(newPos);
    socket.emit(ROUTES.SEND_POSITION_MULTIPONG, {
      code: me.code,
      name: me.name,
      pos: newPos,
    });
  };

  useEffect(() => {
    const updateRoute = path => {
      if (path == '') dispatch(goBack());
    };
    socket.on(ROUTES.UPDATE_ROUTE, updateRoute);
    return () => {
      socket.off(ROUTES.UPDATE_ROUTE, updateRoute);
    };
  });

  return (
    <div
      className="multipong"
      style={{
        backgroundColor: getMyPlayerColor(players, me),
      }}
    >
      <div
        className="multipong-pad"
        onTouchStart={sendPosition(-1)}
        onTouchEnd={sendPosition(0)}
      >
        <img
          src={require('../../assets/multipong/arrow.png').default}
          style={{ transform: 'rotate(180deg)' }}
        />
      </div>
      <div
        className="multipong-pad"
        onTouchStart={sendPosition(1)}
        onTouchEnd={sendPosition(0)}
      >
        <img src={require('../../assets/multipong/arrow.png').default} />
      </div>
    </div>
  );
};

export default MultiPong;
