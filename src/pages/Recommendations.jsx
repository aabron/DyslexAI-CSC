import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../ContextProvider';
import { organizePrompt } from '../backend/History-Recommendations/OrganizePrompt';
import { generateRecs } from '../backend/History-Recommendations/ReadingSuggestions';
import { getUserReadingHistory, updateReadingHistory } from '../backend/History-Recommendations/ReadingHistory';
import { getDatabase, ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';

const Recommendations = () => {
    const { isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user } = useSettings();
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(() => {
        const cachedRecs = localStorage.getItem('recommendations');
        return cachedRecs ? JSON.parse(cachedRecs) : null;
    });
    const [aiHeading, setAiHeading] = useState(() => {
        const cachedHeading = localStorage.getItem('aiHeading');
        return cachedHeading ? cachedHeading : null;
    });

    useEffect(() => {
        if (recommendations) {
            localStorage.setItem('recommendations', JSON.stringify(recommendations));
        }
    }, [recommendations]);

    useEffect(() => {
        if (aiHeading) {
            localStorage.setItem('aiHeading', aiHeading);
        }
    }, [aiHeading]);

    const handleGetRecommendations = async () => {
        setLoading(true);
        try {
            const prompt = await organizePrompt(user.uid);
            const recs = await generateRecs(prompt);
            console.log(recs);
            //save the heading before the colon
            const headingMatch = recs.match(/^(.*?):/);
            if (headingMatch) {
                setAiHeading(headingMatch[1]);
            }

            //book titles
            const bookTitlesMatch = recs.match(/: (.*)/);
            const bookTitles = bookTitlesMatch ? bookTitlesMatch[1].split(',').map(title => title.trim()) : [];
            // console.log(bookTitles);

            //book details from firestore
            const db = getDatabase();
            const booksRef = ref(db, 'books');
            const booksSnapshot = await get(booksRef);
            if (!booksSnapshot.exists()) {
                throw new Error('No books found in the database');
            }
            const books = booksSnapshot.val();
            // console.log(books);

            //filter books
            const recommendedBooks = bookTitles.map(title => {
                console.log(title);
                return Object.values(books).find(book => book.title === title);
            }).filter(book => book !== undefined);

            // console.log(recommendedBooks);
            setRecommendations(recommendedBooks);
        } catch (error) {
            console.error('Error generating recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateReadingHistory = (bookId, title, description) => {
        const userId = user?.uid;
        updateReadingHistory(userId, bookId, title, description);
    };

    const notHome = true;
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user} />
                <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} firstUserName={firstUserName} notHome={notHome} />
                <div className="flex-grow flex flex-col items-center justify-center p-4">
                    {loading ? (
                        <FallingLines color="#4A90E2" width="100" visible={true} />
                    ) : recommendations ? (
                        <>
                            <h1 className="text-3xl font-bold mt-40">AI Powered Reading Suggestions</h1>
                            <button onClick={handleGetRecommendations} className="bg-secondary mt-4 px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 ease-in-out">Re-Generate Recommendations</button>
                            <h1 className="text-xl mt-8">{aiHeading}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                {recommendations?.map((book, index) => (
                                    <div key={index} className="border p-4 rounded shadow-lg">
                                        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                                        {book.imageUrl ? <img src={book.imageUrl} alt={`book cover ${index + 1}`} className="h-[30rem] w-[40rem]" /> : <div className="h-40 w-40 bg-gray-300">No Image Available</div>}
                                        <p className="mb-4">{book.description}</p>
                                        <Link onClick={() => handleUpdateReadingHistory(book.id, book.title, book.description)} to={`/book/${book.id}`} className="bg-secondary  p-2 rounded">
                                            Read Book
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-4">AI Powered Reading Suggestions</h1>
                            <p className="mb-4 text-2xl">Welcome to the AI Powered Reading Suggestions page. Click the button below to generate personalized book recommendations based on your reading history.</p>
                            <button onClick={handleGetRecommendations} className="bg-blue-500  px-4 py-2 rounded hover:bg-blue-700 hover:scale-105 duration-300 ease-in-out">Generate Recommendations</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Recommendations;
