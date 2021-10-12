import { getPlayersFromCode } from '../helpers';
import userRoom from '../schema';

import { mockedExpectedPlayers, mockedPlayers } from './mocks';

jest.mock('../schema');

describe('connection > helpers > getPlayersFromCode', () => {
  beforeAll(() => {
    userRoom.find.mockImplementation(() => Promise.resolve(mockedPlayers));
  });
  it('should get formatted players, only non-host user', async () => {
    const players = await getPlayersFromCode('231');
    expect(userRoom.find).toBeCalledWith({ code: '231', isHost: false });
    expect(userRoom.find).toBeCalledTimes(1);
    expect(players).toEqual(mockedExpectedPlayers);
  });
});
