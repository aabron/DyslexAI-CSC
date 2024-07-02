import React, {useEffect} from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useSettings } from '../SettingsContext';
//import React, { useEffect} from 'react';;

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

  return (
    <div className='font-reddit w-full flex flex-col h-screen'>
      <Navbar setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isOpen={isOpen} firstUserName={firstUserName} setFirstUserName={setFirstUserName} user={user} notHome={notHome} />
      <div className="p-6 bg-light-blue-100 h-full mt-36 px-32" style={{ backgroundColor }}>
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
      <Footer />
    </div>
  );
}

export default Settings;
