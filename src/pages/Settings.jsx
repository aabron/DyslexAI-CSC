import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useSettings } from '../ContextProvider';
import { Dialog, Transition } from '@headlessui/react';
import Modal from '../components/Modal';
import { playWelcomeMessage, ResponsiveVoice } from '../backend/ResponsiveVoice/ResponsiveVoice';
import { saveUserSettings, getUserSettings } from '../backend/UserSettings/UserSettings';
import { usernameUpdate } from '../backend/Auth/UpdateUserName';
import { EmailUpdater } from '../backend/Auth/UpdateEmail';
import { AccountDeletion } from '../backend/Auth/Delete';

function Settings() {
  const { fontSize, setFontSize, fontColor, setFontColor, fontStyle, setFontStyle, backgroundColor, setBackgroundColor, isAuthenticated, setIsAuthenticated, isOpen, setIsOpen, firstUserName, setFirstUserName, user, isVoiceEnabled, toggleForgotPassword, setToggleForgotPassword, blindMode, setBlindMode, deafMode, setDeafMode, defaultMode, setDefaultMode } = useSettings();
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
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

  const handleUpdateUsername = () => {
    // Logic for updating username
    usernameUpdate(newUsername)
      .then(() => {
        setError('')
        setFirstUserName(newUsername);
      }).catch((error) => {
        setError('An error occurred.');
      });
    console.log('Username updated to:', newUsername);
    handleUpdateFirebase();
  };

  const handleUpdateEmail = () => {
    // Logic for updating email
    EmailUpdater(newEmail)
      .then(() => {
        setError('');
      }).catch((error) => {
        if (error.code === 'auth/invalid-email') {
          console.error("Invalid email format!");
        } else {
          console.error("error occured for update email");
        }
      })

    console.log('Email updated to:', newEmail);
  };

  const handleResetPassword = () => {
    setIsOpen(true);
    setToggleForgotPassword(true);
  };

  const handleDeleteUser = () => {
    // Logic for deleting user
    AccountDeletion();
    navigate('/');
    console.log('User deleted');
  };

  const handleBlindMode = () => {
    setBlindMode(!blindMode);
  };

  const handleDeafMode = () => {
    setDeafMode(!deafMode);
  };

  const handleDefaultMode = () => {
    setDefaultMode(!defaultMode);
  };
  console.log(fontSize, fontColor, fontStyle, backgroundColor, blindMode, deafMode, defaultMode);

  // useEffect(() => {
  //   const handleGetUserSettings = async () => {
  //     if (user) {
  //       let settings = await getUserSettings(user.uid);
  //       console.log(settings?.fontSize);
  //       setFontSize(settings?.fontSize);
  //       setFontColor(settings?.fontColor);
  //       setFontStyle(settings?.fontStyle);
  //       setBackgroundColor(settings?.backgroundColor);
  //       setBlindMode(settings?.blindMode);
  //       setDeafMode(settings?.deafMode);
  //       setDefaultMode(settings?.defaultMode);
  //     }
  //   };

  //   handleGetUserSettings();
  // }, [user]);

  // useEffect(() => {
  //   const handleUpdateFirebase = async () => {
  //     if (user) {
  //       let settings = {
  //         fontSize: fontSize,
  //         fontColor: fontColor,
  //         fontStyle: fontStyle,
  //         backgroundColor: backgroundColor,
  //         isVoiceEnabled: isVoiceEnabled,
  //         blindMode: blindMode,
  //         deafMode: deafMode,
  //         defaultMode: defaultMode
  //       };
  //       await saveUserSettings(user.uid, settings);
  //     }
  //   };
  //   handleUpdateFirebase();
  // }, [fontSize, fontColor, fontStyle, backgroundColor, isVoiceEnabled, blindMode, deafMode, defaultMode, user]);

  console.log(blindMode)
  console.log(user?.uid)

  useEffect(() => {
    const cleanup = ResponsiveVoice(blindMode);
    return cleanup;
  }, [blindMode]);

  const handleUpdateFirebase = async () => {
    console.log(fontSize, fontColor, fontStyle, backgroundColor, blindMode, deafMode, defaultMode);
    let settings = {
      fontSize: fontSize,
      fontColor: fontColor,
      fontStyle: fontStyle,
      backgroundColor: backgroundColor,
      isVoiceEnabled: isVoiceEnabled,
      blindMode: blindMode,
      deafMode: deafMode,
      defaultMode: defaultMode
    };
    await saveUserSettings(user.uid, settings);
  };

  return (
    <div className=' w-full flex flex-col h-screen'>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} setFirstUserName={setFirstUserName} user={user} />
      <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isOpen={isOpen} firstUserName={firstUserName} setFirstUserName={setFirstUserName} user={user} notHome={notHome} />
      <div className="p-6 bg-light-blue-100 h-full mt-36 px-32" style={{ backgroundColor }}>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <h1 className="text-2xl font-bold mb-4">Website Settings</h1>
            <div className="mb-4">
              <label className="block mb-2">Font Size:</label>
              <select className="border rounded px-2 py-1 text-black" value={fontSize} onChange={handleFontSizeChange}>
                {[...Array(55)].map((_, i) => (
                  <option key={i} value={i + 6}>{i + 6}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Font Color:</label>
              <input className="border rounded px-2 py-1" type="color" value={fontColor} onChange={handleFontColorChange} />
            </div>

            {/* List of different font styles */}
            <div className="mb-4">
              <label className="block mb-2">Font Style:</label>
              <select className="border rounded px-2 py-1 text-black" value={fontStyle} onChange={handleFontStyleChange}>
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
                <option value="reddit">Reddit</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Background Color:</label>
              <input className="border rounded px-2 py-1" type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
            </div>

            <h1 className='text-2xl font-bold mb-4'>Accessibility Settings</h1>
            <div className="mb-4">
              <label className="block mb-2">Blind Mode:</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={handleBlindMode}
                  checked={blindMode}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Deaf Mode:</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={handleDeafMode}
                  checked={deafMode}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Default Mode:</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={handleDefaultMode}
                  checked={defaultMode}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div>
              <button
                className="bg-secondary px-4 py-2 rounded mt-2 hover:scale-105 duration-300 ease-in-out"
                onClick={handleUpdateFirebase}
              >
                Update Settings
              </button>
            </div>
          </div>

          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-bold mb-4">Account Management</h2>

            <div className="mb-4">
              <label className="block mb-2">Update Displayname:</label>
              <input
                className="border rounded px-2 py-1 w-full"
                type="text"
                placeholder={firstUserName}
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button
                className="bg-secondary  px-4 py-2 rounded mt-2 hover:scale-105 duration-300 ease-in-out"
                onClick={handleUpdateUsername}
              >
                Update Displayname
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
                className="bg-secondary  px-4 py-2 rounded mt-2 hover:scale-105 duration-300 ease-in-out"
                onClick={handleUpdateEmail}
              >
                Update Email
              </button>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Reset Password:</label>
              <button
                className="bg-secondary px-4 py-2 rounded mt-2 hover:scale-105 duration-300 ease-in-out"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 mt-12">Delete Account</h2>
              <button
                className="bg-secondary hover:bg-secondary py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 duration-300 ease-in-out mt-1"
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
