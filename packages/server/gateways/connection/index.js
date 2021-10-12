import ROUTES from '../../routes';
import io from '../../utils/io';
import { checkRoomCodeValidation } from '../shared/helpers';

import { getPlayersFromCode } from './helpers';
import userRoom from './schema';

export const createSession = async (data, socket) => {
  const { code } = data;
  const existingRoom = await userRoom.findOne({ code, isHost: true }).exec();
  /*use in debug only */
  if (existingRoom) {
    await userRoom.updateOne(
      {
        name: existingRoom.name,
        code: code,
      },
      {
        socketId: socket.id,
      }
    );
    /* End of debug */
  } else {
    await userRoom.create({
      name: 'host' + code,
      code,
      socketId: socket.id,
      isHost: true,
    });
  }

  socket.join(code);
  const players = await getPlayersFromCode(code);
  io.to(code).emit(ROUTES.GET_PLAYERS_SESSION, players);
};

export const connectToSession = async (data, socket) => {
  const { code, name } = data;
  const hostUser = await userRoom.findOne({ code, isHost: true }).exec();

  if (!hostUser) {
    socket.emit(ROUTES.SET_ERROR, {
      message: "Unable to connect to session, it doesn't exists",
    });
    return;
  }

  const existingUser = await userRoom.findOne({ name, code }).exec();
  if (!existingUser) {
    await userRoom.create({ name, code, socketId: socket.id });
  } /*else if (existingUser.isActive) {
    socket.emit(ROUTES.SET_ERROR, {
      message: 'Unable to connect to session, an active user took this name',
    });
    return;
  } */ else {
    await userRoom.updateOne(
      {
        name: existingUser.name,
        code: existingUser.code,
      },
      {
        socketId: socket.id,
        isActive: true,
      }
    );
  }

  socket.join(code);
  const players = await getPlayersFromCode(code);
  io.to(code).emit(ROUTES.GET_PLAYERS_SESSION, players);
};

export const deleteOfSession = async (data, socket) => {
  const { code, name } = data;
  const hostUser = await userRoom.findOne({ socketId: socket.id }).exec();
  if (!checkRoomCodeValidation(code, socket)) return;
  if (!hostUser || hostUser.code !== code) {
    socket.emit(ROUTES.SET_ERROR, {
      message: "Can't find the host user of this session",
    });
    return;
  }

  const existingUser = await userRoom.findOne({ name, code }).exec();
  if (!existingUser) {
    socket.emit(ROUTES.SET_ERROR, {
      message: "Can't find this user on session",
    });
    return;
  }

  try {
    await userRoom.deleteOne({ socketId: existingUser.socketId });
  } catch (error) {
    console.error('Unable to delete user', error);
  }

  const sockets = await io.fetchSockets();
  const userSocket = sockets.find(({ id }) => id === existingUser.socketId);
  userSocket?.leave(code);

  const players = await getPlayersFromCode(code);
  io.to(code).emit(ROUTES.GET_PLAYERS_SESSION, players);
};

export const disconnectToSession = async socket => {
  const user = await userRoom.findOne({ socketId: socket.id }).exec();

  if (!user) {
    return;
  }

  const { code } = user;
  await userRoom.updateOne({ socketId: socket.id }, { isActive: false });

  const players = await getPlayersFromCode(code);
  io.to(code).emit(ROUTES.GET_PLAYERS_SESSION, players);
};
