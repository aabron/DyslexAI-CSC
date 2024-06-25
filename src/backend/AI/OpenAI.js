import axios from "axios";
import OpenAI from "openai";

export const generateImage = async (prompt) => {
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPEN_AI_API_KEY, dangerouslyAllowBrowser: true });
    try {
        console.log("Generating image...")
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
          });
          let image_url = response.data[0].url;
          return image_url;
    } catch (error) {
        throw new Error('Error generating image:', error);
    }
};
