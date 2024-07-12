import { eBookSearch } from '../EBookImport';
import axios from 'axios';
import { getLastBookId } from '../EBookImport';

jest.mock('axios');
jest.mock('../EBookImport', () => ({
  ...jest.requireActual('../EBookImport'),
  getLastBookId: jest.fn(),
}));

describe('eBookSearch', () => {
  it('should search for e-books and return a list of books', async () => {
    const mockResponse = {
      data: {
        items: [
          {
            link: 'http://example.com/book1.pdf',
            title: 'Book 1',
            snippet: 'Description 1',
            pagemap: { cse_thumbnail: [{ src: 'http://example.com/image1.jpg' }] },
          },
          {
            link: 'http://example.com/book2.pdf',
            title: 'Book 2',
            snippet: 'Description 2',
            pagemap: { cse_thumbnail: [{ src: 'http://example.com/image2.jpg' }] },
          },
        ],
        queries: {
          nextPage: [{ startIndex: 11 }],
        },
      },
    };

    axios.get.mockResolvedValue(mockResponse);
    getLastBookId.mockResolvedValue(0);

    const searchQuery = 'Harry+Potter+pdf';
    const books = await eBookSearch(searchQuery);

    expect(axios.get).toHaveBeenCalledWith(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyDLM-FFzf1ZKg1_SI1yW98xv3qqDCbhwPE&cx=b005aa8a990ec4e7a&q=${searchQuery}&filetype=pdf&start=1`
    );
    expect(books).toEqual([
      {
        id: 'book1',
        title: 'Book 1',
        description: 'Description 1',
        imageUrl: 'http://example.com/image1.jpg',
        pdfUrl: 'http://example.com/book1.pdf',
      },
      {
        id: 'book2',
        title: 'Book 2',
        description: 'Description 2',
        imageUrl: 'http://example.com/image2.jpg',
        pdfUrl: 'http://example.com/book2.pdf',
      },
    ]);
  });

  it('should handle errors during the search', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const searchQuery = 'Harry+Potter+pdf';

    await expect(eBookSearch(searchQuery)).rejects.toThrow('Error searching PDFs:');
  });
});