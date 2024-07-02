import React, { useEffect, useState } from 'react';

const Header = () => {
    const [fontSize, setFontSize] = useState(32);

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    useEffect(() => {
        setFontSize(fontSize);
    }, [fontSize]);

    return (
        <header className="relative header-animation h-[32rem] flex flex-col items-center justify-center text-center font-reddit">
            <div className="relative z-10 text-white">
                <h1 className="text-6xl font-bold header-text">Welcome to DyslexAI</h1>
                <p className="mt-4 header-text delay-200" style={{ fontSize: `${fontSize}px` }}>
                    Enhancing readability and accessibility through AI technology
                </p>
            </div>
        </header>
    );
};

export default Header;

