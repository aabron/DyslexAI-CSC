import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import Header from '../components/Header';
import Modal from '../components/Modal';

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-gray-100 min-h-screen w-full font-reddit">
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated}/>
            <Navbar setIsOpen={setIsOpen} />
            <Header />
        </div>
    );
};

export default Home;