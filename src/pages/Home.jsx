/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import { Link } from 'react-scroll';
import FloatingBooks from '../components/decorative/FloatingBooks';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import Header from '../components/Header';
import { useSettings } from '../ContextProvider';
import axios from 'axios';
import ResponsiveVoicefrom from '../backend/ResponsiveVoice/ResponsiveVoice'; 
import MiscModal from '../components/MiscModal';

const Home = () => {
    const { isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user, isVoiceEnabled, setIsVoiceEnabled, isMiscModalOpen, setIsMiscModalOpen, isTickingEnabled, setIsTickingEnabled, tickInterval, setTickInterval } = useSettings();
   
    //useEffect(() => {
       //ResponsiveVoice.playWelcomeMessage();
    //}, []);

    useEffect(() => {
        if (isVoiceEnabled && isMiscModalOpen) {
            window.responsiveVoice.speak("Welcome to DyslexAI, the web application that leverages AI technology to enhance readability and accessibility for individuals with dyslexia, blindness, or deafness.");
        }
    }, []);


    useEffect(() => {
        if (isTickingEnabled) {
            const handleMouseMove = (event) => {
                const mouseX = event.clientX;
                const mouseY = event.clientY;
                const elements = document.querySelectorAll('button, a, p, h2, h3, h1');
                let minDistance = Infinity;
                let closestElement = null;

                elements.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    const elementX = (rect.left + rect.right) / 2;
                    const elementY = (rect.top + rect.bottom) / 2;
                    const distance = Math.sqrt(Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2));

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestElement = element;
                    }
                });

                if (minDistance < 50) {
                    clearInterval(tickInterval);
                    window.responsiveVoice.speak(closestElement.innerText || closestElement.alt);
                } else {
                    // const frequency = Math.max(100, 1000 - minDistance * 2);
                    // console.log(frequency) // Adjust frequency calculation as needed
                    // clearInterval(tickInterval);
                    // setTickInterval(setInterval(() => {
                    //     window.responsiveVoice.speak("Tick");
                    //     console.log('Tick');
                    // }, frequency));
                }
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                clearInterval(tickInterval);
            };
        }
    }, [isTickingEnabled, tickInterval]);
    //simple fix for now to make the navbar styling dynamic based on the current page
    const notHome = false;
    return (
        <>
            <div className=" min-h-[94.3vh] w-full ">
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user} />
                <MiscModal isOpen={isMiscModalOpen} closeModal={() => setIsMiscModalOpen(false)} errorMessage={"Welcome to DyslexAI do you want to keep voice announcing on?"} setIsVoiceEnabled={setIsVoiceEnabled} />
                <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} firstUserName={firstUserName} notHome={notHome} />
                <Header />
                <div className='relative z-0'>
                    <FloatingBooks />
                    <div className="relative container mx-auto py-10 flex justify-center items-center">
                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 z-20 max-w-[80%]">
                            <div className="flex flex-col justify-center  p-4">
                                <h2 className="text-4xl font-bold text-left">What is DyslexAI?</h2>
                                <p className="mt-2">
                                    DyslexAI is a web application that leverages AI technology to enhance readability and accessibility for individuals with dyslexia, blindness, or deafness.
                                </p>
                                <Link to="about" smooth={true} duration={500} className="mt-4 bg-gradient-to-r from-secondary to-primary p-2 rounded-lg cursor-pointer hover:scale-105 duration-300 ease-in-out transition-transform max-w-[60%]">Learn More</Link>
                            </div>
                            <div className="flex flex-col justify-center  p-4">
                                <h2 className="text-4xl font-bold">How does it work?</h2>
                                <p className="mt-2">
                                    DyslexAI uses machine learning models to generate images using text from e-books as descriptions of what to generate, sound ques for the blind to guide across the screen, Text-To-Speech, and adjustable fonts, colors, and more.
                                </p>
                                {isAuthenticated ? 
                                    <a href="/library" smooth={true} duration={500} className="mt-4 bg-gradient-to-r from-secondary to-primary  p-2 rounded-lg cursor-pointer hover:scale-105 duration-300 ease-in-out transition-transform max-w-[60%]">Get Started</a>
                                    :
                                    <a href="/library" onClick={() => setIsOpen(true)} smooth={true} duration={500} className="mt-4 bg-gradient-to-r from-secondary to-primary  p-2 rounded-lg cursor-pointer hover:scale-105 duration-300 ease-in-out transition-transform max-w-[60%]">Get Started</a>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='relative z-20'>
                        <div className="container mx-auto py-10 z-20">
                            {/* about section */}
                            <div className='h-auto w-full bg-inherit flex flex-col justify-center border-b pb-10 border-black'>
                                <div className="flex justify-center items-center">
                                    <h2 className="text-4xl font-bold">About Us</h2>
                                </div>
                                <div className='text-center mt-4 px-6 flex justify-center '>
                                    <p className='text-lg max-w-[80%]'>
                                        At DyslexAI, our goal is to make learning easier for people with dyslexia through smart technology. We are students at Wayne State University, and our team includes Aaron and Mahbubur, who are front-end developers focused on making our apps easy to use. Saba and Ishmael work on the back-end, ensuring our tools are powerful and effective. Together, we develop technologies that improve reading and understanding, making educational materials more accessible for everyone. We are committed to supporting the dyslexic community with supportive and easy-to-use applications.
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between w-full mt-6 px-12'>
                                <div>
                                    <h2 className="text-4xl font-bold text-center mb-10">Meet the Team</h2>
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