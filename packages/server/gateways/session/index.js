import ROUTES from '../../routes';
import { checkRoomCodeValidation } from '../shared/helpers';

export const updateParty = (data, socket) => {
  const { code, path } = data;
  if (!checkRoomCodeValidation(code, socket)) return;
  socket.to(code).emit(ROUTES.UPDATE_ROUTE, path);
};
