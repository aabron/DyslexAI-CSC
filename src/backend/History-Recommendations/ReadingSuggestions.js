import axios from "axios";
import OpenAI from "openai";

export const generateRecs = async (prompt) => {
    //creates an instance of the OpenAI class
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPEN_AI_API_KEY, dangerouslyAllowBrowser: true });
    try {
        console.log("Generating recs...")
        const response = await openai.chat.completions.create({
            messages: [{ "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": prompt }],
            model: "gpt-4o",
        });
        let recsList = response.choices[0].message.content;
        console.log(recsList);
        return recsList;
    } catch (error) {
        //error handling
        throw new Error('Error generating recs:', error.message);
    }
};