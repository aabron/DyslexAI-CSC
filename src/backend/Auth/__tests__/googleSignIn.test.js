import { googleSignIn } from '../Signup';
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

jest.mock('firebase/auth');
jest.mock('firebase/database');

describe('googleSignIn', () => {
  it('should sign in with Google and save user info', async () => {
    const mockUser = { uid: '123' };
    const mockResult = {
      user: mockUser,
      additionalUserInfo: { profile: { given_name: 'First', family_name: 'Last' } },
    };
    signInWithPopup.mockResolvedValue(mockResult);
    getAdditionalUserInfo.mockReturnValue(mockResult.additionalUserInfo);
    set.mockResolvedValue();

    await googleSignIn();

    expect(signInWithPopup).toHaveBeenCalledWith(expect.anything(), expect.any(GoogleAuthProvider));
    expect(set).toHaveBeenCalledWith(ref(expect.anything(), 'users/123'), {
      firstname: 'First',
      lastname: 'Last',
    });
  });
});