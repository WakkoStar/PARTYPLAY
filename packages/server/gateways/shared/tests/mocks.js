import { mockedPlayer } from '../../connection/tests/mocks';

export const mockedSocket = {
  id: 'test123',
  to: () => ({
    emit: () => jest.fn(),
  }),
  join: jest.fn(),
  emit: jest.fn(),
};

export const mockedIo = {
  to: () => ({
    emit: () => jest.fn(),
  }),
  fetchSockets: () => mockedPlayer,
};
