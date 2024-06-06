import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get, getDatabase, set } from "firebase/database";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Document, Page, pdfjs } from 'react-pdf';
import { FallingLines } from 'react-loader-spinner';
import * as pdfjsLib from 'pdfjs-dist';
import { generateImage } from '../../backend/AI/OpenAI';
import Modal from '../../components/Modal';

const Book = ({ setIsOpen, isAuthenticated, setIsAuthenticated, isOpen }) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs`;
    const { id } = useParams();
    const db = getDatabase();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [bookTitle, setBookTitle] = useState('');
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [failed, setFailed] = useState(false);
    const [imageUrlArray, setImageUrlArray] = useState([]);

    useEffect(() => {
        const fetchPdfUrl = async () => {
            try {
                const bookRef = ref(db, `books/${id}`);
                get(bookRef).then(async (snapshot) => {
                    if (snapshot.exists()) {
                        await fetchAndParsePdf(snapshot.val().pdfUrl);
                        setBookTitle(snapshot.val().title);
                        // console.log('Book found:', snapshot.val());
                    }
                });
            } catch (error) {
                console.error(error);
                setFailed(true);
            }
        };

        const fetchAndParsePdf = async (url) => {
            try {
                const loadingTask = pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;
                const numPages = pdf.numPages;
                const pagesText = [];

                for (let i = 1; i <= numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    pagesText.push(pageText);
                }

                setPages(pagesText);
            } catch (error) {
                console.error('Error parsing PDF:', error);
                setFailed(true);
            }
        };

        fetchPdfUrl();

    }, [id, db]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, pages.length - 1));
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const handleGenerateImage = async () => {
        // for(let i = 0; i < pages.length; i++){
        //     let lines = pages[i].split('.')
        //     for(let j = 0; j < lines.length; j++){
        //         let imageUrl = await generateImage(lines[j]);
        //     }
        // }

        let lines = pages[currentPage].split('.')
        for (let j = 0; j < lines.length; j++) {
            let imageUrl = await generateImage(lines[j]);
            setImageUrlArray(prevArray => [...prevArray, imageUrl]);
            console.log('Generated image:', imageUrl)
        }

    };
    console.log(imageUrlArray);

    return (
        <div className="min-h-screen flex flex-col font-reddit">
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/>
            <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} />
            <div className="container mx-auto py-10">
                {pages.length > 0 ? (
                    <>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className="text-3xl font-bold mb-6">{bookTitle}</h1>
                            <button onClick={handleGenerateImage} className='bg-gray-800 text-white p-3 rounded-lg hover:scale-105 hover:bg-secondary duration-300'>Generate Images For this Pages Text</button>
                            <h1 className="text-3xl font-bold mb-6">{currentPage + 1}/{pages.length}</h1>
                        </div>
                        <div className="whitespace-pre-wrap text-lg">{pages[currentPage]}</div>
                        <div className="flex h-auto flex-wrap justify-center items-center mt-4 w-full ">
                            {imageUrlArray.map((url, index) => (
                                imageUrlArray[index + 1] ?
                                    <img src={url} alt={`Generated image ${index}`} className="h-64 w-64 mx-2 rounded-lg my-1" />
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