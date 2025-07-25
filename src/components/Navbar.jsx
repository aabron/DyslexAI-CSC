import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../ContextProvider';

const Navbar = ({ notHome }) => {
    const { isAuthenticated, setIsOpen, firstUserName} = useSettings();
    const [isOpenMobile, setIsOpenMobile] = useState(false);

    const toggleMenu = () => {
        setIsOpenMobile(!isOpenMobile);
    };
    return (
        <nav className={notHome ? "header-animation p-4 w-full flex flex-col sm:flex-row sm:justify-between absolute z-10" : "bg-transparent p-4 w-full flex flex-col sm:flex-row sm:justify-between absolute z-10"}>
            <div className="container mx-auto flex justify-between items-center ">
                <a href="/">
                    <div className="flex items-center">
                        <img src='https://dyslex-ai.s3.amazonaws.com/file.png' alt="logo" className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-black hover:border-white duration-300 ease-in-out" />
                        <h1 className="text-2xl sm:text-3xl font-bold  pl-5 tracking-wide">DyslexAI</h1>
                    </div>
                </a>
                <div className="sm:hidden ">
                    <button onClick={toggleMenu} className=" focus:outline-none ">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpenMobile ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
                        </svg>
                    </button>
                </div>
                <ul className={`sm:flex sm:items-center sm:space-x-6 ${isOpenMobile ? 'block' : 'hidden'} sm:block`}>
                    {isAuthenticated && <Link to="/" smooth={true} duration={500} className="block sm:inline-block  hover:scale-105 duration-300 ease-in-out transition-transform cursor-pointer py-2">Home</Link>}
                    {isAuthenticated && <Link to="/ebooksearch" smooth={true} duration={500} className="block sm:inline-block  hover:scale-105 duration-300 ease-in-out transition-transform cursor-pointer py-2">E-book search</Link>}
                    {isAuthenticated && <Link to="/settings" smooth={true} duration={500} className="block sm:inline-block  hover:scale-105 duration-300 ease-in-out transition-transform cursor-pointer py-2">Settings</Link>}
                    {isAuthenticated && <Link to="/library" smooth={true} duration={500} className="block sm:inline-block  hover:scale-105 duration-300 ease-in-out transition-transform cursor-pointer py-2">Library</Link>}
                    {isAuthenticated && <Link to="/recommendations" smooth={true} duration={500} className="block sm:inline-block  hover:scale-105 duration-300 ease-in-out transition-transform cursor-pointer py-2">AI Recommendations</Link>}
                    <div className='flex flex-col ites-center justify-center'>
                        {isAuthenticated && <p className='text-lg'>Hello, {firstUserName}</p>}
                        <button onClick={() => setIsOpen(true)} smooth={true} duration={500} className="block sm:inline-block  p-3 rounded-lg bg-transparent border-2 border-black hover:scale-105 hover:border-white duration-300 ease-in-out cursor-pointer">{isAuthenticated ? "Logout" : "Login"}</button>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar