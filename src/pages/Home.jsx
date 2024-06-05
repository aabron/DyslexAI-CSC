import React, { lazy, useState } from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import FloatingBooks from '../components/decorative/FloatingBooks';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Header from '../components/Header';

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <div className="bg-gray-100 min-h-[94.3vh] w-full font-reddit">
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated}/>
            <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} />
            <Header />
            <div className='relative z-0'>
                <FloatingBooks />
                <div className="container mx-auto py-10">
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 z-20">
                        
                        <div className="flex flex-col justify-center items-center p-4 ">
                            <h2 className="text-2xl font-bold text-gray-800">What is DyslexAI?</h2>
                            <p className="mt-2 text-gray-600">
                                DyslexAI is a web application that leverages AI technology to enhance readability and accessibility for individuals with dyslexia, blindness, or deafness.
                            </p>
                            <Link to="about" smooth={true} duration={500} className="mt-4 bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-lg cursor-pointer hover:scale-105 duration-300 ease-in-out transition-transform">Learn More</Link>
                        </div>
                        <div className="flex flex-col justify-center items-center p-4">
                            <h2 className="text-2xl font-bold text-gray-800">How does it work?</h2>
                            <p className="mt-2 text-gray-600">
                                DyslexAI uses machine learning models to analyze text and generate images using text from e-books as descriptions of what to generate, sound ques for the blind to guide across the screen, Text-To-Speech, and adjustable fonts, colors, and more.
                            </p>
                            <Link to="about" smooth={true} duration={500} className="mt-4 bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-lg cursor-pointer hover:scale-105 duration-300 ease-in-out transition-transform">Get Started</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Home;