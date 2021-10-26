import ROUTES from '../../routes';
import io from '../../utils/io';
import userRoom from '../connection/schema';
import { checkRoomCodeValidation } from '../shared/helpers';

export const setPositionMultipong = async (data, socket) => {
  const { code, name, pos } = data;

  if (!checkRoomCodeValidation(code, socket)) return;

  const hostUser = await userRoom.findOne({ code, isHost: true }).exec();

  if (!hostUser) {
    socket.emit(ROUTES.SET_ERROR, {
      message: "Unable to connect to session, it doesn't exists",
    });
    return;
  }
  io.to(hostUser.socketId).emit(ROUTES.SHOW_POSITION_MULTIPONG, { name, pos });
};
