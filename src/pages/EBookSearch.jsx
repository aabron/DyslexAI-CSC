import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { eBookSearch, formatSearchQuery } from '../backend/E-book Import/EBookImport';
import { FallingLines } from 'react-loader-spinner';
import { ref, set, getDatabase } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../ContextProvider';
import ResponsiveVoice from '../backend/ResponsiveVoice/ResponsiveVoice';

const EBookSearch = () => {
    const { isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user } = useSettings();

   //saba
    // useEffect(() => {
    //     const content = document.body.innerText;
    //     ResponsiveVoice.speakPageContent(content);
    // }, []);
    //saba

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [importedBook, setImportedBook] = useState(null);
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const cachedResults = localStorage.getItem('searchResults');
        const cachedQuery = localStorage.getItem('searchQuery');
        if (cachedResults) {
            setSearchResults(JSON.parse(cachedResults));
        }
        if (cachedQuery) {
            setSearchQuery(cachedQuery);
        }
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const formattedSearchQuery = formatSearchQuery(searchQuery);
            const results = await eBookSearch(formattedSearchQuery);
            console.log(results);
            setTimeout(() => {
                setSearchResults(results);
                setLoading(false);
                localStorage.setItem('searchResults', JSON.stringify(results));
                localStorage.setItem('searchQuery', searchQuery);
            }, 2000);
        } catch (error) {
            console.error('Error during eBook search:', error);
            setError(error);
            setLoading(false);
        }
    };

    const handleImportBook = async (book) => {
        console.log('Importing book:', book);
        const db = getDatabase();
        const bookRef = ref(db, `books/${book.id}`);
        await set(bookRef, book);
        setImportedBook(book);
        setImportModalOpen(true);
    };

    const notHome = true;

    return (
        <>
        <div className="min-h-screen flex flex-col font-reddit">
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user} />
            <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} firstUserName={firstUserName} notHome={notHome} />
            <div className="container mx-auto py-10 mt-36">
                <h1 className="text-3xl font-bold mb-6">Search and Import E-Books</h1>
                <h5 className="text-lg mb-6">Here you can search for any e-books, in pdf format, on the web and import them to your library.</h5>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search e-books..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full max-w-md"
                    />
                    <button onClick={handleSearch} className="bg-primary text-white p-2 rounded ml-2">Search</button>
                </div>
                {error && <div className="text-red-500 text-center mb-4">{error.message}</div>}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen max-h-[80vh]">
                        <div className="loader text-lg">Loading...</div>
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto">
                        {(searchResults === undefined) || (searchResults?.length === 0) ? (
                            <div className="text-center col-span-3">No books found.</div>
                        ) : (
                            searchResults?.map((book, index) => (
                                <div key={index} className="border p-4 rounded shadow-lg">
                                    <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                                    <img src={book.imageUrl} alt={`book cover ${index + 1}`} className="mb-4 w-auto h-[400px]" />
                                    <p className="mb-4">{book.description}</p>
                                    <button onClick={() => handleImportBook(book)} className="bg-secondary text-white p-2 rounded hover:scale-105 ease-in-out duration-300 hover:bg-primary">Import Book</button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            {importModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 rounded shadow-lg z-10">
                        <h2 className="text-xl font-bold mb-4">Book Imported</h2>
                        <p className="mb-4">The book "{importedBook.title}" has been successfully imported.</p>
                        <button onClick={() => nav(`/book/${importedBook.id}`)} className="bg-primary text-white p-2 rounded">Go to Book</button>
                        <button onClick={() => setImportModalOpen(false)} className="bg-secondary text-white p-2 rounded ml-2">Close</button>
                    </div>
                </div>
            )}
        </div>
        <Footer />
        </>
    );
};

export default EBookSearch;
