import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="header-animation p-6 text-white sticky font-reddit">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left mb-4 md:mb-0">{new Date().getFullYear()} DyslexAI. Made By Saba Begum, Aaron Perel, Ishmael Gonzalez and Mahbubur Khan.</p>
        <a
          href="https://github.com/aabron/DyslexAI-CSC"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white hover:text-gray-300"
        >
          <FaGithub className="mr-2" />
          View on GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
