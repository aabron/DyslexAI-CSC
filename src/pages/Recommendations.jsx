import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { eBookSearch, formatSearchQuery } from '../backend/E-book Import/EBookImport';
import { FallingLines } from 'react-loader-spinner';
import { ref, set, getDatabase } from "firebase/database";
import { useNavigate } from 'react-router-dom';

const Recommendations = ({ isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user }) => {
    const nav = useNavigate();

    useEffect(() => {
        
    }, []);

    const handleGetRecommendations = (event) => {
        
    };

    const formatRecommendations = async () => {
        
    };

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
