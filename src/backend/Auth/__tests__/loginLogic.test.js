import { loginLogic } from '../Login';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth');

describe('loginLogic', () => {
  it('should log in a user with email and password', async () => {
    const mockUser = { uid: '123' };
    signInWithEmailAndPassword.mockResolvedValue({ user: mockUser });

    await loginLogic('test@example.com', 'password');

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined,'test@example.com', 'password');
  });
});