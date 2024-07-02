import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { eBookSearch } from '../backend/E-book Import/EBookImport';
import { FallingLines } from 'react-loader-spinner';

const EBookSearch = ({ isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        //function to get e books from the web
        console.log(searchQuery);
        const results = await eBookSearch(searchQuery);
        console.log(results);
        setTimeout(() => {
            setSearchResults([
                { title: 'Sample Book 1', description: 'Description for Sample Book 1', imageUrl: 'sample1.jpg' },
                { title: 'Sample Book 2', description: 'Description for Sample Book 2', imageUrl: 'sample2.jpg' }
            ]);
            setLoading(false);
        }, 2000);
    };

    const handleImportBook = (book) => {
        console.log('Importing book:', book);
    };

    const notHome = true;

    return (
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-screen max-h-[80vh]">
                        {searchResults.map((book, index) => (
                            <div key={index} className="border p-4 rounded shadow-lg">
                                <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                                <img src={book.imageUrl} alt={`book cover ${index + 1}`} className="mb-4" />
                                <p className="mb-4">{book.description}</p>
                                <button onClick={() => handleImportBook(book)} className="bg-secondary text-white p-2 rounded">Import Book</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default EBookSearch;
