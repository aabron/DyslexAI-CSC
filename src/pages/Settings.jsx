import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useSettings } from '../SettingsContext';
import Modal from '../components/Modal';

function Settings({ isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user }) {
  const { fontSize, setFontSize, fontColor, setFontColor, fontStyle, setFontStyle, backgroundColor, setBackgroundColor } = useSettings();
  const notHome = true;

  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
  };

  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
  };

  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  const handleUpdateUsername = () => {
    // Logic for updating username
    console.log('Username updated to:', newUsername);
  };

  const handleUpdateEmail = () => {
    // Logic for updating email
    console.log('Email updated to:', newEmail);
  };

  const handleResetPassword = () => {
    // Logic for resetting password
    console.log('Password reset email sent to:', resetEmail);
  };

  const handleDeleteUser = () => {
    // Logic for deleting user
    console.log('User deleted');
  };

  return (
    <div className='font-reddit w-full flex flex-col h-screen'>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user}/>
      <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isOpen={isOpen} firstUserName={firstUserName} setFirstUserName={setFirstUserName} user={user} notHome={notHome} />
      <div className="p-6 bg-light-blue-100 h-full mt-36 px-32" style={{ backgroundColor }}>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <div className="mb-4">
              <label className="block mb-2">Font Size:</label>
              <select className="border rounded px-2 py-1" value={fontSize} onChange={handleFontSizeChange}>
                {[...Array(55)].map((_, i) => (
                  <option key={i} value={i + 6}>{i + 6}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Font Color:</label>
              <input className="border rounded px-2 py-1" type="color" value={fontColor} onChange={handleFontColorChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Font Style:</label>
              <select className="border rounded px-2 py-1" value={fontStyle} onChange={handleFontStyleChange}>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Palatino">Palatino</option>
                <option value="Garamond">Garamond</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Impact">Impact</option>
                <option value="reddit">reddit</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Background Color:</label>
              <input className="border rounded px-2 py-1" type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
            </div>
          </div>

          <div className="w-1/2 pl-4">
            <h2 className="text-xl font-bold mb-4">Account Management</h2>

            <div className="mb-4">
              <label className="block mb-2">Update Username:</label>
              <input
                className="border rounded px-2 py-1 w-full"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={handleUpdateUsername}
              >
                Update Username
              </button>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Update Email:</label>
              <input
                className="border rounded px-2 py-1 w-full"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={handleUpdateEmail}
              >
                Update Email
              </button>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Reset Password:</label>
              <input
                className="border rounded px-2 py-1 w-full"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Email"
              />
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded mt-2"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>

            <div>
              <button
                className="bg-gray-900 hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 duration-300 ease-in-out"
                type="button"
                onClick={handleDeleteUser}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Settings;
