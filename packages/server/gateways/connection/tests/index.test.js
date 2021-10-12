import { connectToSession, createSession, deleteOfSession } from '..';
import ROUTES from '../../../routes';
import io from '../../../utils/io';
import { checkRoomCodeValidation } from '../../shared/helpers';
import { mockedIo, mockedSocket } from '../../shared/tests/mocks';
import { getPlayersFromCode } from '../helpers';
import userRoom from '../schema';

import {
  mockedData,
  mockedExpectedPlayers,
  mockedUserRoomModel,
} from './mocks';

jest.mock('../../../utils/io');
jest.mock('../helpers');
jest.mock('../schema');
jest.mock('../../shared/helpers');

describe('connection > createSession', () => {
  beforeAll(() => {
    getPlayersFromCode.mockImplementation(() =>
      Promise.resolve(mockedExpectedPlayers)
    );
    io.to.mockImplementation(mockedIo.to);
    userRoom.findOne.mockImplementation(mockedUserRoomModel.findNotOne);
    userRoom.create.mockImplementation(mockedUserRoomModel.create);
    userRoom.updateOne.mockImplementation(mockedUserRoomModel.updateOne);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should create a new session', async () => {
    const socket = mockedSocket;
    const data = mockedData;
    await createSession(data, socket);

    expect(userRoom.findOne).toHaveBeenCalledWith({
      code: '231',
      isHost: true,
    });
    expect(userRoom.create).toHaveBeenCalledWith({
      name: 'host231',
      code: '231',
      socketId: mockedSocket.id,
      isHost: true,
    });
    expect(userRoom.updateOne).not.toHaveBeenCalled();
    expect(socket.join).toHaveBeenCalledWith(mockedData.code);
    expect(getPlayersFromCode).toHaveBeenCalledWith(mockedData.code);
    expect(io.to).toHaveBeenCalledWith(mockedData.code);
  });

  it('should not create session, already existing', () => {
    //TODO
  });
});

describe('connection > connectToSession', () => {
  beforeAll(() => {
    getPlayersFromCode.mockImplementation(() =>
      Promise.resolve(mockedExpectedPlayers)
    );
    io.to.mockImplementation(mockedIo.to);

    userRoom.create.mockImplementation(mockedUserRoomModel.create);
    userRoom.updateOne.mockImplementation(mockedUserRoomModel.updateOne);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const socket = mockedSocket;
  const data = mockedData;
  const mockedHostUserArgs = { code: '231', isHost: true };
  const mockedPlayerArgs = { code: '231', name: 'Hugo' };

  it('should connect to session and create user session room', async () => {
    userRoom.findOne.mockImplementation(args => {
      if (args.isHost) {
        return mockedUserRoomModel.findOne();
      }
      if (args.name == 'Hugo') {
        return mockedUserRoomModel.findNotOne();
      }
    });

    await connectToSession(data, socket);

    expect(userRoom.findOne).toHaveBeenNthCalledWith(1, mockedHostUserArgs);
    expect(userRoom.findOne).toHaveBeenNthCalledWith(2, mockedPlayerArgs);
    expect(userRoom.create).toHaveBeenCalledWith({
      name: 'Hugo',
      code: '231',
      socketId: mockedSocket.id,
    });
    expect(userRoom.updateOne).not.toHaveBeenCalled();
    expect(socket.join).toHaveBeenCalledWith(mockedData.code);
    expect(getPlayersFromCode).toHaveBeenCalledWith(mockedData.code);
    expect(io.to).toHaveBeenCalledWith(mockedData.code);
  });

  it('should not connect to session , host user already existing', async () => {
    userRoom.findOne.mockImplementation(mockedUserRoomModel.findNotOne);

    await connectToSession(data, socket);

    expect(socket.emit).toHaveBeenCalledWith(ROUTES.SET_ERROR, {
      message: "Unable to connect to session, it doesn't exists",
    });
  });

  it('should connect to session and update user session room', async () => {
    userRoom.findOne.mockImplementation(mockedUserRoomModel.findInactiveOne);

    await connectToSession(data, socket);

    expect(userRoom.findOne).toHaveBeenNthCalledWith(1, mockedHostUserArgs);
    expect(userRoom.findOne).toHaveBeenNthCalledWith(2, mockedPlayerArgs);
    expect(userRoom.updateOne).toHaveBeenCalledWith(
      { name: 'Hugo', code: '231' },
      { socketId: mockedSocket.id, isActive: true }
    );
    expect(userRoom.create).not.toHaveBeenCalled();
    expect(socket.join).toHaveBeenCalledWith(mockedData.code);
    expect(getPlayersFromCode).toHaveBeenCalledWith(mockedData.code);
    expect(io.to).toHaveBeenCalledWith(mockedData.code);
  });

  it('should not connect to session because user already active', async () => {
    userRoom.findOne.mockImplementation(mockedUserRoomModel.findOne);

    await connectToSession(data, socket);

    expect(userRoom.findOne).toHaveBeenNthCalledWith(1, mockedHostUserArgs);
    expect(userRoom.findOne).toHaveBeenNthCalledWith(2, mockedPlayerArgs);
    expect(userRoom.updateOne).not.toHaveBeenCalled();
    expect(userRoom.create).not.toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalledWith(ROUTES.SET_ERROR, {
      message: 'Unable to connect to session, an active user took this name',
    });
  });
});

describe('connection > deleteOfSession', () => {
  beforeAll(() => {
    checkRoomCodeValidation.mockImplementation(() => jest.fn());
    getPlayersFromCode.mockImplementation(() =>
      Promise.resolve(mockedExpectedPlayers)
    );
    io.to.mockImplementation(mockedIo.to);
    io.fetchSockets.mockImplementation(mockedIo.fetchSockets);
    userRoom.create.mockImplementation(mockedUserRoomModel.create);
    userRoom.updateOne.mockImplementation(mockedUserRoomModel.updateOne);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const socket = mockedSocket;
  const data = mockedData;
  const mockedPlayerArgs = { code: '231', name: 'Hugo' };

  it('should delete session', async () => {
    await deleteOfSession(data, socket);
    userRoom.findOne.mockImplementation(args => {
      if (args.socketId) {
        return mockedUserRoomModel.findOne();
      }
      if (args.name == 'Hugo') {
        return mockedUserRoomModel.findNotOne();
      }
    });

    expect(checkRoomCodeValidation).toHaveBeenCalledTimes(1);
    expect(io.fetchSockets).toHaveBeenCalledTimes(1);
    expect(userRoom.findOne).toHaveBeenNthCalledWith(1, {
      socketId: socket.id,
    });
    expect(userRoom.findOne).toHaveBeenNthCalledWith(2, mockedPlayerArgs);
    expect(userRoom.deleteOne).toHaveBeenCalledWith({ socketId: 'hugo123' });
    expect(getPlayersFromCode).toHaveBeenCalledWith(mockedData.code);
    expect(io.to).toHaveBeenCalledWith(mockedData.code);
  });

  it('should not delete session, host user doesnt exists', async () => {
    userRoom.findOne.mockImplementation(mockedUserRoomModel.findNotOne);

    await deleteOfSession(data, socket);

    expect(checkRoomCodeValidation).toHaveBeenCalledTimes(1);
    expect(socket.emit).toHaveBeenCalledWith(ROUTES.SET_ERROR, {
      message: "Can't find the host user of this session",
    });
  });

  it('should not delete session, the user doesnt exists', async () => {
    userRoom.findOne.mockImplementation(args => {
      if (args.socketId) {
        return mockedUserRoomModel.findOne();
      }
      if (args.name == 'Hugo') {
        return mockedUserRoomModel.findNotOne();
      }
    });

    await deleteOfSession(data, socket);

    expect(checkRoomCodeValidation).toHaveBeenCalledTimes(1);
    expect(userRoom.findOne).toHaveBeenNthCalledWith(1, {
      socketId: socket.id,
    });
    expect(userRoom.findOne).toHaveBeenNthCalledWith(2, mockedPlayerArgs);
    expect(socket.emit).toHaveBeenCalledWith(ROUTES.SET_ERROR, {
      message: "Can't find this user on session",
    });
  });
});
