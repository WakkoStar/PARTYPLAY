import { checkRoomCodeValidation } from '../../shared/helpers';
import { mockedSocket } from '../../shared/tests/mocks';
import { updateParty } from '../index';

import { mockedData } from './mocks';

jest.mock('../../shared/helpers');

describe('session > updateParty', () => {
  beforeAll(() => {
    checkRoomCodeValidation.mockImplementation(() => jest.fn());
  });

  it('should update party', () => {
    const socket = mockedSocket;
    const data = mockedData;

    updateParty(data, socket);
    expect(checkRoomCodeValidation).toHaveBeenCalledTimes(1);
  });
});
