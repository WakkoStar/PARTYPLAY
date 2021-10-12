import userRoom from './schema';

export const getPlayersFromCode = async code => {
  const players = await userRoom.find({ code, isHost: false });
  const playersParsed = players.map(({ name, isActive }) => ({
    isActive,
    name,
  }));
  return playersParsed;
};
