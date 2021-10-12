export const mockedPlayers = [
  {
    id: 'hugo123',
    name: 'Hugo',
    isActive: true,
    code: '231',
    isHost: false,
    leave: () => jest.fn(),
  },
  {
    id: 'axel123',
    name: 'Axel',
    isActive: true,
    code: '231',
    isHost: false,
    leave: () => jest.fn(),
  },
  {
    id: 'did123',
    name: 'Didz',
    isActive: false,
    code: '231',
    isHost: false,
    leave: () => jest.fn(),
  },
  {
    id: 'oli123',
    name: 'Olivia',
    isActive: false,
    code: '231',
    isHost: false,
    leave: () => jest.fn(),
  },
];

export const mockedExpectedPlayers = [
  { name: 'Hugo', isActive: true },
  { name: 'Axel', isActive: true },
  { name: 'Didz', isActive: false },
  { name: 'Olivia', isActive: false },
];

export const mockedPlayer = {
  socketId: 'hugo123',
  name: 'Hugo',
  isActive: true,
  code: '231',
  isHost: false,
};

export const mockedData = {
  code: '231',
  name: 'Hugo',
};

export const mockedUserRoomModel = {
  create: () => jest.fn(),
  updateOne: () => jest.fn(),
  findNotOne: () => ({
    exec: () => Promise.resolve(null),
  }),
  findInactiveOne: () => ({
    exec: () => Promise.resolve({ ...mockedPlayer, isActive: false }),
  }),
  findOne: () => ({
    exec: () => Promise.resolve(mockedPlayer),
  }),
  deleteOne: () => jest.fn(),
};
