import React, { useState, useEffect } from 'react';
import { ref, onValue, getDatabase } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { FallingLines } from 'react-loader-spinner';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const Library = ({ isAuthenticated, setIsOpen, isOpen, setIsAuthenticated, firstUserName, setFirstUserName, user }) => {
    const [books, setBooks] = useState([]);
    const auth = getAuth();
    const db = getDatabase();
    const nav = useNavigate();
    const [loading, setLoading] = useState(true);

    //get books from database
    useEffect(async () => {
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

    useEffect(async () => {
        onAuthStateChanged(auth, (user) => {
          if (user !== null) {
            console.log('logged in');
          }
          else {
            console.log('no user');
            nav('/');
          }
          });
      }, [auth]);

    return (
        <>
        <div className="min-h-[94.3vh] flex flex-col">
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user}/>
            <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} firstUserName={firstUserName}/>
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
