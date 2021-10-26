import { playerColors } from '../../utils/constants';

export const getMyPlayerColor = (players, me) =>
  playerColors[players.findIndex(({ name }) => name === me.name)];
