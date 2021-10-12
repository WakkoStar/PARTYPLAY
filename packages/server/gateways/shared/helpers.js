import ROUTES from '../../routes';

export const checkRoomCodeValidation = (code, socket) => {
  if (!code || typeof code != 'string') {
    socket.emit(ROUTES.SET_ERROR, {
      message: 'No code given or invalid format',
    });
    return false;
  }
  const isValid = socket.rooms.has(code);
  if (!isValid) {
    socket.emit(ROUTES.SET_ERROR, {
      message: "Unable to find the session, user isn't connected to",
    });
  }
  return isValid;
};
