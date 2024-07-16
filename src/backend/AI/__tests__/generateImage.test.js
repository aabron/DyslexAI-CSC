import { generateImage } from '../OpenAI';
import OpenAI from 'openai';

jest.mock('openai');

describe('generateImage', () => {
  it('should generate an image URL from a prompt', async () => {
    const mockResponse = {
      data: [{ url: 'http://example.com/image.png' }],
    };
    OpenAI.prototype.images.generate.mockResolvedValue(mockResponse);

    const prompt = 'A beautiful sunset over the mountains';
    const imageUrl = await generateImage(prompt);

    expect(OpenAI.prototype.images.generate).toHaveBeenCalledWith({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });
    expect(imageUrl).toBe('http://example.com/image.png');
  });

  it('should throw an error if image generation fails', async () => {
    OpenAI.prototype.images.generate.mockRejectedValue(new Error('API error'));

    const prompt = 'A beautiful sunset over the mountains';

    await expect(generateImage(prompt)).rejects.toThrow('Error generating image:');
  });
});