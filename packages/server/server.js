import {
  connectToSession,
  createSession,
  disconnectToSession,
  deleteOfSession,
} from './gateways/connection';
import { updateParty } from './gateways/session';
import { askObject, setObject } from './gateways/throwCube';
import ROUTES from './routes';
import startDb from './utils/bdd';
import io from './utils/io';
import httpServer from './utils/server';

let isDbStarted = false;

io.on('connection', socket => {
  if (!isDbStarted) {
    startDb();
    isDbStarted = true;
  }

  // CONNECTION
  console.info(`Connexion : ${socket.id}`);
  socket.on(ROUTES.CREATE_SESSION, data => void createSession(data, socket));
  socket.on(
    ROUTES.CONNECT_TO_SESSION,
    data => void connectToSession(data, socket)
  );
  socket.on(
    ROUTES.DELETE_OF_SESSION,
    data => void deleteOfSession(data, socket)
  );
  socket.on('disconnect', () => {
    disconnectToSession(socket);
    console.info(`Deconnexion : ${socket.id}`);
  });

  //SESSION
  socket.on(ROUTES.BEGIN_GAME, data => void updateParty(data, socket));
  socket.on(ROUTES.END_GAME, data => void updateParty(data, socket));

  // THROW A CUBE GAME
  socket.on(ROUTES.SET_OBJECT, data => void setObject(data, socket));
  socket.on(ROUTES.ASK_OBJECT, data => void askObject(data, socket));
});

httpServer.listen(process.env.PORT || 8000, () => {
  console.info(`Partyplay is listening on port ${process.env.PORT || 8000}`);
});
