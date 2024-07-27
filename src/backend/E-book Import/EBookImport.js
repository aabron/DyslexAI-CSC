import React, { useState } from 'react';
import { ref, onValue, getDatabase } from "firebase/database";
import axios from 'axios';

export const eBookSearch = async (searchQuery) => {
    //function to search the web for pdfs
    const apiKey = "AIzaSyDLM-FFzf1ZKg1_SI1yW98xv3qqDCbhwPE";
    const cx = "b005aa8a990ec4e7a";
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}&filetype=pdf`;
    let books = [];
    let startIndex = 1;

    try {
        while (books.length < 90 && startIndex < 100) {
            const response = await axios.get(`${url}&start=${startIndex}`);
            const data = response.data;
            console.log(data.items);

            //get the last book id from Firebase
            const lastBookId = await getLastBookId();
            let currentId = lastBookId + 1;
            console.log(currentId);

            const newBooksPromises = data.items.map(async (item) => {
                if (item.link.endsWith('.pdf')) {
                    const imageUrl = await resolveImageUrl(item.pagemap?.cse_thumbnail?.[0]?.src, item.pagemap?.cse_image?.[0]?.src);
                    return {
                        id: `book${currentId++}`,
                        title: item.title || 'No title available',
                        description: item.snippet || 'No description available',
                        imageUrl: imageUrl,
                        pdfUrl: item.link
                    };
                }
            });

            const newBooks = await Promise.all(newBooksPromises);

            //filter out undefined values (discard non-pdf links)
            books = books.concat(newBooks.filter(book => book !== undefined));

            if (!data.queries.nextPage) {
                break;
            }

            startIndex = data.queries.nextPage[0].startIndex;
        }

        return books.slice(0, 90);
    } catch (error) {
        console.error('Error searching PDFs:', error);
    }
}

//gets the last book id from the database
const getLastBookId = async () => {
    const db = getDatabase();
    const booksRef = ref(db, 'books/');
    return new Promise((resolve, reject) => {
        onValue(booksRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            if (data) {
                const bookList = Object.values(data);
                // console.log(bookList);
                const lastBook = bookList.length;
                resolve(lastBook);
            } else {
                resolve(0);
            }
        }, (error) => {
            console.error('Error fetching books:', error);
            reject(error);
        });
    });
}

export const formatSearchQuery = (searchQuery) => {
    return searchQuery.split(' ').join('+') + '+pdf';
}

const resolveImageUrl = async (thumbnailUrl, imageUrl) => {
    const isValidUrl = (url) => {
        return url && url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    };

    if (await validateImageUrl(thumbnailUrl)) {
        return thumbnailUrl;
    } else if (await validateImageUrl(imageUrl)) {
        return imageUrl;
    } else {
        return 'No Image Available';
    }
}

const validateImageUrl = async (url) => {
    try {
        const response = await axios.get(url);
        return response.status === 200;
    } catch {
        return false;
    }
}

