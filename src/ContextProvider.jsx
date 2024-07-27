import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useSettings = () => useContext(AppContext);

export const ContextProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16);
    const [fontColor, setFontColor] = useState('#000000');
    const [fontStyle, setFontStyle] = useState('Arial');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [userInfo, setUserInfo] = useState({
        userName: "",
        email: ""
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [firstUserName, setFirstUserName] = useState(null);
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={
            { 
                fontSize, 
                setFontSize, 
                fontColor, 
                setFontColor, 
                fontStyle, 
                setFontStyle, 
                backgroundColor, 
                setBackgroundColor, 
                isAuthenticated,
                setIsAuthenticated,
                isOpen,
                setIsOpen,
                firstUserName,
                setFirstUserName,
                user,
                setUser,
                userInfo,
                setUserInfo
            }}>
            {children}
        </AppContext.Provider>
    );
};