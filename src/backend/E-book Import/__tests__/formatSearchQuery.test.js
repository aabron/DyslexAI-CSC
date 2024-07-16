import { formatSearchQuery } from '../EBookImport';

describe('formatSearchQuery', () => {
  it('should format the search query correctly', () => {
    const searchQuery = 'Harry Potter';
    const formattedQuery = formatSearchQuery(searchQuery);
    expect(formattedQuery).toBe('Harry+Potter+pdf');
  });
});