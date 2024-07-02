import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-scroll';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { FallingLines } from 'react-loader-spinner';
import Header from '../components/Header';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const Search = ({ isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user }) => {
    
}

export default Search;
