import React, { useState, useEffect } from 'react';
import { ref, onValue, getDatabase } from "firebase/database";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FallingLines } from 'react-loader-spinner';

const Library = ({ isAuthenticated, setIsOpen }) => {
    const [books, setBooks] = useState([]);
    const db = getDatabase();
    const [loading, setLoading] = useState(true);

    //get books from database
    useEffect(() => {
        const booksRef = ref(db, 'books/');
        onValue(booksRef, (snapshot) => {
            const data = snapshot.val();
            setBooks(data ? Object.values(data) : []);
            console.log("query result: ", data)
        });
        if (books.length > 0) {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [db]);

    return (
        <>
        <div className="min-h-[94.3vh] flex flex-col">
            <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} />
            {loading ?
                <div className="container mx-auto py-10">
                    <h1 className="text-3xl font-bold mb-6">Library</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {books.map((book, index) => (
                            <div key={index} className="border p-4 rounded shadow-lg">
                                <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                                <img src={book.imageUrl} alt={`book cover ${index + 1}`}/>
                                <p className="mb-4">{book.description}</p>
                                <Link to={`/book/${book.id}`} className="bg-primary text-white p-2 rounded">
                                    Read Book
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <FallingLines
                    height="80"
                    width="80"
                    radius="9"
                    color="blue"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass
                />
            }
            
        </div>
        <Footer />
        </>
    );
};

export default Library;
