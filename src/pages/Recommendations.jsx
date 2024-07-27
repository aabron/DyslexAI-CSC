import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { FallingLines } from 'react-loader-spinner';
import { ref, set, getDatabase } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../ContextProvider';
import { playWelcomeMessage, ResponsiveVoice } from '../backend/ResponsiveVoice/ResponsiveVoice'; 

const Recommendations = () => {
    const { isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user } = useSettings();
    const nav = useNavigate();

    useEffect(() => {
        //boilerplate
    }, []);

    const handleGetRecommendations = (event) => {
        //boilerplate
    };

    const formatRecommendations = async () => {
        //boilerplate
    };

    useEffect(() => {
        if (isVoiceEnabled) {
            ResponsiveVoice();
        }
    }, [isVoiceEnabled]);

    const notHome = true;

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user} />
                <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} firstUserName={firstUserName} notHome={notHome} />
            </div>
            <Footer />
        </>
    );
};

export default Recommendations;
