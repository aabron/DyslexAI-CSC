import { forgotPasswordLogic } from '../Forgotpassword';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

jest.mock('firebase/auth');

describe('forgotPasswordLogic', () => {
  it('should send a password reset email', async () => {
    sendPasswordResetEmail.mockResolvedValue();

    await forgotPasswordLogic('test@example.com');

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), 'test@example.com');
  });
});