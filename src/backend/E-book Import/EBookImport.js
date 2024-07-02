import axios from 'axios';
import React, { useState } from 'react';

export const eBookSearch = async (searchQuery) => {
    //function to search the web for pdfs
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const cx = process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_ENGINE_ID;
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=ofmiceandmen`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        const urls = data.items.map(item => item.link);
        return urls;
      } catch (error) {
        console.error('Error searching PDFs:', error);
      }
}


