import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-secondary p-6 text-white sticky">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left mb-4 md:mb-0">{new Date().getFullYear()} DyslexAI. Made By Students.</p>
        <a
          href="https://github.com/your-github-username/your-repo"
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
