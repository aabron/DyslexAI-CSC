import React, { useState, useEffect } from 'react';
import { ref, onValue, getDatabase } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { FallingLines } from 'react-loader-spinner';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useSettings } from '../ContextProvider';
import { playWelcomeMessage, ResponsiveVoice } from '../backend/ResponsiveVoice/ResponsiveVoice'; 

const Library = () => {
    const { isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user } = useSettings();
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const notHome = true;
    const auth = getAuth();
    const db = getDatabase();
    const nav = useNavigate();

    //fetch books from database
    useEffect(() => {
        const booksRef = ref(db, 'books/');
        onValue(booksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const bookList = Object.values(data);
                setBooks(bookList);
                setFilteredBooks(bookList); //initialize filtered books with all books
            }
            setLoading(false); //set loading to false after fetching books
        }, (error) => {
            console.error('Error fetching books:', error);
            setLoading(false); 
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [db]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                console.log('logged in');
            } else {
                console.log('no user');
                nav('/');
            }
        });
    }, [auth, nav]);

    useEffect(() => {
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [books, searchQuery]);

    useEffect(() => {
        if (isVoiceEnabled) {
            ResponsiveVoice();
        }
    }, [isVoiceEnabled]);

    // useEffect(() => {
    //     const content = document.body.innerText;
    //     ResponsiveVoice.speakPageContent(content);
    // }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>  
            <div className="min-h-[94.3vh] flex flex-col">
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user}/>
                <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} firstUserName={firstUserName} notHome={notHome}/>
                {loading ?
                    <div className="container mx-auto py-10 mt-32">
                        <FallingLines
                            height="80"
                            width="80"
                            radius="9"
                            color="blue"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            wrapperClass="my-10"
                        />
                    </div>
                    :
                    <div className="container mx-auto py-10 mt-32">
                        <h1 className="text-3xl font-bold mb-6">Library</h1>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchQuery}
                                onChange={(e) => handleSearchInputChange(e)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full max-w-md"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {filteredBooks.map((book, index) => (
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
                }
            </div>
            <Footer />
        </>
    );
};

export default Library;

