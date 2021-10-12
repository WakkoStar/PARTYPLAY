import ROUTES from '../../routes';
import io from '../../utils/io';
import { checkRoomCodeValidation } from '../shared/helpers';

export const setObject = (data, socket) => {
  const { code, indexObject } = data;
  if (!checkRoomCodeValidation(code, socket)) return;
  io.to(code).emit(ROUTES.THROW_OBJECT, indexObject);
};

export const askObject = (data, socket) => {
  const { code, name } = data;
  if (!checkRoomCodeValidation(code, socket)) return;
  socket.to(code).emit(ROUTES.ASK_OBJECT, name);
};
