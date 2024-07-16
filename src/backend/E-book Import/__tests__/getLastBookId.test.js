import { getLastBookId } from '../EBookImport';
import { getDatabase, ref, onValue } from 'firebase/database';

jest.mock('firebase/database');

describe('getLastBookId', () => {
  it('should return the last book id', async () => {
    const mockData = { book1: {}, book2: {} };
    onValue.mockImplementation((ref, callback) => {
      callback({ val: () => mockData });
    });

    const lastBookId = await getLastBookId();
    expect(lastBookId).toBe(2);
  });

  it('should return 0 if no books are found', async () => {
    onValue.mockImplementation((ref, callback) => {
      callback({ val: () => null });
    });

    const lastBookId = await getLastBookId();
    expect(lastBookId).toBe(0);
  });
});