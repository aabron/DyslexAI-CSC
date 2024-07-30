import { logoutLogic } from '../Logout';
import { getAuth, signOut } from 'firebase/auth';

jest.mock('firebase/auth');

describe('logoutLogic', () => {
  it('should log out a user', async () => {
    signOut.mockResolvedValue();

    await logoutLogic();

    expect(signOut).toHaveBeenCalledWith(undefined);
  });
});