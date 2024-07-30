import { signUpLogic } from '../Signup';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

jest.mock('firebase/auth');
jest.mock('firebase/database');

describe('signUpLogic', () => {
  it('should sign up a user and update profile', async () => {
    const mockUser = { uid: '123' };
    createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    updateProfile.mockResolvedValue();
    set.mockResolvedValue();

    await signUpLogic('test@example.com', 'testuser', 'password', 'First', 'Last');

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, 'test@example.com', 'password');
    expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: 'testuser' });
    expect(set).toHaveBeenCalledWith(ref(expect.anything(), 'users/123'), {
      firstname: 'First',
      lastname: 'Last',
    });
  });
});