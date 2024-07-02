import React, { useState } from 'react';
import Footer from '../components/Footer'; // Import the Footer component
// Create a funciton for the setting page
function Settings() {
  const [fontSize, setFontSize] = useState(16); // Default font size in px
  const [fontColor, setFontColor] = useState('#000000'); // Default font color
  const [fontStyle, setFontStyle] = useState('Arial'); // Default font style
  const [backgroundColor, setBackgroundColor] = useState('#ADD8E6'); // Default background color (light blue)

  // Handle font size change
  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
  };

  // Handle font color change
  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
  };

  // Handle font style change
  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
  };

  // Handle background color change
  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  return (
    // Main container with padding and light blue background
    <div className="p-6 bg-light-blue-100 min-h-screen" style={{ backgroundColor }}>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      
      {/* Font Size setting */}
      <div className="mb-4">
        <label className="block mb-2">Font Size:</label>
        <select className="border rounded px-2 py-1" value={fontSize} onChange={handleFontSizeChange}>
          {[...Array(55)].map((_, i) => (
            <option key={i} value={i + 6}>{i + 6}</option>
          ))}
        </select>
      </div>

      {/* Font Color setting */}
      <div className="mb-4">
        <label className="block mb-2">Font Color:</label>
        <input className="border rounded px-2 py-1" type="color" value={fontColor} onChange={handleFontColorChange} />
      </div>

      {/* Font Style setting */}
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
        </select>
      </div>

      {/* Background Color setting */}
      <div className="mb-4">
        <label className="block mb-2">Background Color:</label>
        <input className="border rounded px-2 py-1" type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
      </div>
    </div>
  );
}

export default Settings;
