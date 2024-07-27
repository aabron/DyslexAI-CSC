import { getDatabase, ref, get } from "firebase/database";
import { getUserReadingHistory } from "./ReadingHistory";

export const organizePrompt = async (userId) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId + '/readingHistory');
    const booksRef = ref(db, 'books');

    try {
        //users reading history
        const userSnapshot = await get(userRef);
        if (!userSnapshot.exists()) {
            throw new Error('No reading history found for user');
        }
        const readingHistory = userSnapshot.val();
        console.log(readingHistory);
        //books from the database
        const booksSnapshot = await get(booksRef);
        if (!booksSnapshot.exists()) {
            throw new Error('No books found in the database');
        }
        const books = booksSnapshot.val();
        console.log(books);

        //dynamic prompt
        let prompt = "Based on the user's reading history, recommend similar books from the database. The user's reading history includes the following books, include and introductory statement followed by a colon, after the colon have a comma separated list of the books in the following format: <Book Title>, <Book Title>, (and so on). Do not cut book titles short include the entire title of the book. Please always format your response in a similar fashion to the following example -> Based on your reading history, I recommend the following books from the database: <book title>, <book title>, (and so on)\n";
        for (const bookId in readingHistory) {
            const book = readingHistory[bookId];
            prompt += `- ${book.title}: ${book.description}\n`;
        }
        prompt += "\nHere are the available books in the database:\n";
        for (const bookId in books) {
            const book = books[bookId];
            prompt += `- ${book.title}: ${book.description}\n`;
        }

        return prompt;
    } catch (error) {
        console.error('Error organizing prompt: ', error);
        throw new Error('Error organizing prompt:', error);
    }
};
