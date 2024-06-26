/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-scroll';
import FloatingBooks from '../components/decorative/FloatingBooks';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Header from '../components/Header';
import axios from 'axios';

const Home = ({ isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user }) => {
    const notHome = false;
    return (
        <>
            <div className="bg-gray-100 min-h-[94.3vh] w-full font-reddit">
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user} />
                <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} firstUserName={firstUserName} notHome={notHome}/>
                <Header />
                <div className='relative z-0'>
                    <FloatingBooks />
                    <div className="relative container mx-auto py-10 flex justify-center items-center">
                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 z-20 max-w-[80%]">
                            <div className="flex flex-col justify-center  p-4">
                                <h2 className="text-4xl font-bold text-gray-800 text-left">What is DyslexAI?</h2>
                                <p className="mt-2 text-gray-800">
                                    DyslexAI is a web application that leverages AI technology to enhance readability and accessibility for individuals with dyslexia, blindness, or deafness.
                                </p>
                                <Link to="about" smooth={true} duration={500} className="mt-4 bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-lg cursor-pointer hover:scale-105 duration-300 ease-in-out transition-transform max-w-[60%]">Learn More</Link>
                            </div>
                            <div className="flex flex-col justify-center  p-4">
                                <h2 className="text-4xl font-bold text-black">How does it work?</h2>
                                <p className="mt-2 text-black">
                                    DyslexAI uses machine learning models to generate images using text from e-books as descriptions of what to generate, sound ques for the blind to guide across the screen, Text-To-Speech, and adjustable fonts, colors, and more.
                                </p>
                                <Link to="about" smooth={true} duration={500} className="mt-4 bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-lg cursor-pointer hover:scale-105 duration-300 ease-in-out transition-transform max-w-[60%]">Get Started</Link>
                            </div>
                        </div>
                    </div>
                    <div className='relative z-20'>
                        <div className="container mx-auto py-10 z-20">
                            {/* about section */}
                            <div className='h-auto w-full bg-inherit flex flex-col justify-center border-b pb-10 border-black'>
                                <div className="flex justify-center items-center">
                                    <h2 className="text-4xl font-bold text-black">About Us</h2>
                                </div>
                                <div className='text-center mt-4 px-6 flex justify-center '>
                                    <p className='text-lg text-gray-700 max-w-[80%]'>
                                        At DyslexAI, our goal is to make learning easier for people with dyslexia through smart technology. We are students at Wayne State University, and our team includes Aaron and Mahbubur, who are front-end developers focused on making our apps easy to use. Saba and Ishmael work on the back-end, ensuring our tools are powerful and effective. Together, we develop technologies that improve reading and understanding, making educational materials more accessible for everyone. We are committed to supporting the dyslexic community with supportive and easy-to-use applications.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between w-full mt-6 px-12'>
                                <div>
                                    <h2 className="text-4xl font-bold text-black text-center mb-10">Meet the Team</h2>
                                </div>
                                <div className='flex flex-row'>
                                    <div className='flex-col items-center' >
                                        <img src='aaron.jpeg' alt='Aaron Picture' className=' h-auto rounded-lg' />
                                        <h3 className='text-lg font-semibold'>Aaron</h3>
                                    </div>
                                    <div className='flex justify-around w-full'>
                                        <div className='flex-col items-center' >
                                            <img src='mahbub1.png' alt='Mahbubur Picture' className='h-auto max-h-[17.8rem] rounded-lg' />
                                            <h3 className='text-lg font-semibold'>Mahbubur</h3>
                                        </div>
                                    </div>
                                    <div className='flex justify-around w-full'>
                                        <div className='flex-col items-center' >
                                            <img src='saba.jpeg' alt='Saba Picture' className='h-auto max-h-[17.8rem] rounded-lg' />
                                            <h3 className='text-lg font-semibold'>Saba</h3>
                                        </div>
                                    </div>
                                    <div className='flex justify-around w-full '>
                                        <div className='flex-col items-center' >
                                            <img src='Ishmael.jpg' alt='Ishmael Picture' className='h-auto max-h-[17.8rem] rounded-lg' />
                                            <h3 className='text-lg font-semibold'>Ishmael</h3>
                                        </div>
                                    </div>
                                </div>
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