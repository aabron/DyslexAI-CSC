import { googleSignIn } from '../Signup';
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import { getDatabase, set, ref } from 'firebase/database';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: 'mockUid' },
  })),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({
    setCustomParameters: jest.fn()
  })),
  getAdditionalUserInfo: jest.fn()
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  set: jest.fn(),
  ref: jest.fn()
}));

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