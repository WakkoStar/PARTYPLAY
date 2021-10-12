import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './style.scss';

import { replace } from '../../redux/historySlice';
import { setMe } from '../../redux/meSlice';
import { setPlayers } from '../../redux/playersSlice';
import ROUTES from '../../routes';
import socket from '../../utils/socket';

import InputText from './Components/InputText';

const Connection = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const connectToServer = () => {
    socket.emit(ROUTES.CONNECT_TO_SESSION, { name, code });
  };

  useEffect(() => {
    const handlePlayers = players => {
      const me = players.find(p => p.name === name);
      dispatch(setMe({ ...me, code }));
      dispatch(setPlayers(players));
      dispatch(replace('/session'));
    };

    const handleError = error => {
      if (error.message) {
        alert(error.message);
      }
    };

    socket.on(ROUTES.GET_PLAYERS_SESSION, handlePlayers);
    socket.on(ROUTES.SET_ERROR, handleError);

    return () => {
      socket.off(ROUTES.GET_PLAYERS_SESSION, handlePlayers);
      socket.off(ROUTES.SET_ERROR, handleError);
    };
  }, [dispatch, name, code]);

  return (
    <div className="connection">
      <h1>Connexion</h1>
      <InputText label="Pseudo" setState={setName} />
      <InputText label="Code" setState={setCode} />
      <input type="submit" value="Valider" onClick={connectToServer} />
    </div>
  );
};

export default Connection;
