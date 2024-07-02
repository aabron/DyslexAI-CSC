import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16);
    const [fontColor, setFontColor] = useState('#000000');
    const [fontStyle, setFontStyle] = useState('Arial');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    return (
        <SettingsContext.Provider value={{ fontSize, setFontSize, fontColor, setFontColor, fontStyle, setFontStyle, backgroundColor, setBackgroundColor }}>
            {children}
        </SettingsContext.Provider>
    );
};