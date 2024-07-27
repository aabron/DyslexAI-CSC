import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, get, getDatabase, set } from "firebase/database";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Document, Page, pdfjs } from 'react-pdf';
import { FallingLines } from 'react-loader-spinner';
import * as pdfjsLib from 'pdfjs-dist';
import { generateImage } from '../../backend/AI/OpenAI';
import Modal from '../../components/Modal';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useSettings } from '../../ContextProvider';

const Book = () => {
    const { isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user } = useSettings();
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs`;
    const { id } = useParams();
    const db = getDatabase();
    const auth = getAuth();
    const nav = useNavigate();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [bookTitle, setBookTitle] = useState('');
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [failed, setFailed] = useState(false);
    const [imageUrlArray, setImageUrlArray] = useState([]);
    const notHome = true;

    const fetchAndParsePdf = async (url) => {
        const tryFetchPdf = async (url) => {
            const loadingTask = pdfjsLib.getDocument({ url });
            const pdf = await loadingTask.promise;
            const numPages = pdf.numPages;
            const pagesText = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                pagesText.push(pageText);
            }

            return pagesText;
        };

        try {
            // Try fetching the PDF directly
            const pagesText = await tryFetchPdf(url);
            setPages(pagesText);
        } catch (error) {
            console.error('Error fetching PDF directly:', error);

            // Check if the error is a CORS issue
            if (error.message.includes('Failed to fetch')) {
                try {
                    // Use the proxy server to fetch the PDF
                    const proxyUrl = `http://localhost:3001/proxy?url=${encodeURIComponent(url)}`;
                    const pagesText = await tryFetchPdf(proxyUrl);
                    setPages(pagesText);
                } catch (proxyError) {
                    console.error('Error fetching PDF via proxy:', proxyError);
                    setFailed(true);
                }
            } else {
                setFailed(true);
            }
        }
    };

    useEffect(() => {
        const fetchPdfUrl = async () => {
            try {
                const bookRef = ref(db, `books/${id}`);
                get(bookRef).then(async (snapshot) => {
                    if (snapshot.exists()) {
                        await fetchAndParsePdf(snapshot.val().pdfUrl);
                        setBookTitle(snapshot.val().title);
                    }
                });
            } catch (error) {
                console.error(error);
                setFailed(true);
            }
        };

        fetchPdfUrl();

    }, [id, db]);

    useEffect(() => {
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

    useEffect(() => {
        //locally cache images
        const cachedImages = localStorage.getItem(`imageUrlArray_${id}`);
        if (cachedImages) {
            setImageUrlArray(JSON.parse(cachedImages));
        }
    }, [id]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, pages.length - 1));
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const handleGenerateImage = async () => {
        let lines = pages[currentPage].split('.')
        for (let j = 0; j < lines.length; j++) {
            let imageUrl = await generateImage(lines[j]);
            setImageUrlArray(prevArray => {
                //cache images locally on generation
                const newArray = [...prevArray, imageUrl];
                localStorage.setItem(`imageUrlArray_${id}`, JSON.stringify(newArray));
                return newArray;
            });
            console.log('Generated image:', imageUrl)
        }
    };
    console.log(imageUrlArray);

    return (
        <div className="min-h-screen flex flex-col font-reddit">
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user}/>
            <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} firstUserName={firstUserName} notHome={notHome}/>
            <div className="container mx-auto py-10 mt-36">
                {pages.length > 0 ? (
                    <>
                        <div className='flex flex-row justify-between items-center px-5'>
                            <h1 className="text-3xl font-bold mb-6">{bookTitle}</h1>
                            <button onClick={handleGenerateImage} className='bg-gray-800 text-white p-3 rounded-lg hover:scale-105 hover:bg-secondary duration-300'>Generate Images For this Pages Text</button>
                            <h1 className="text-3xl font-bold mb-6">{currentPage + 1}/{pages.length}</h1>
                        </div>
                        <div className="whitespace-pre-wrap text-lg px-5">{pages[currentPage]}</div>
                        <div className="flex h-auto flex-wrap justify-center items-center mt-4 w-full ">
                            {imageUrlArray.map((url, index) => (
                                imageUrlArray[index + 1] ?
                                    <div className='flex flex-col'>
                                        <h2 className='text-lg font-bold'>Sentence {index + 1}</h2>
                                        <img src={url} alt={`Generated image ${index}`} className="h-64 w-64 mx-2 rounded-lg my-1" />
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
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                disabled={currentPage <= 0}
                                onClick={handlePreviousPage}
                                className="bg-primary text-white p-2 rounded mx-2 disabled:bg-gray-300"
                            >
                                Previous
                            </button>
                            <button
                                disabled={currentPage >= pages.length - 1}
                                onClick={handleNextPage}
                                className="bg-primary text-white p-2 rounded mx-2"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    !failed ? <FallingLines
                        height="80"
                        width="80"
                        radius="9"
                        color="blue"
                        ariaLabel="three-dots-loading"
                        wrapperStyle
                        wrapperClass
                    />
                        :
                        <p>Failed to load book! Please try again later.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Book;