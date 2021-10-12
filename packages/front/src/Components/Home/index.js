import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { push } from '../../redux/historySlice';
import { setPlayers } from '../../redux/playersSlice';
import ROUTES from '../../routes';
import socket from '../../utils/socket';
import './style.scss';

const Home = () => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.players.value);
  const me = useSelector(state => state.me.value);

  useEffect(() => {
    const handlePlayers = players => {
      dispatch(setPlayers(players));
    };

    const updateRoute = path => {
      dispatch(push(path));
    };

    socket.on(ROUTES.GET_PLAYERS_SESSION, handlePlayers);
    socket.on(ROUTES.UPDATE_ROUTE, updateRoute);

    return () => {
      // socket.off(ROUTES.GET_PLAYERS_SESSION, handlePlayers);
      socket.off(ROUTES.UPDATE_ROUTE, updateRoute);
    };
  }, [dispatch]);

  return (
    <div className="home">
      <h1>Joueurs</h1>
      <div>
        {players.map(player => (
          <p
            key={player.name}
            style={{
              opacity: player.isActive ? 1 : 0.3,
              textDecoration: player.name === me.name ? 'underline' : 'none',
            }}
          >
            {player.name}
          </p>
        ))}
      </div>
      <div className="home-bottom-text-container">
        <h1>En attente du lancement de la partie...</h1>
      </div>
    </div>
  );
};

export default Home;
