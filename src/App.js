// App.js
import { useSettings } from './ContextProvider';
import React, { useEffect, lazy, Suspense, useState, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Home from './pages/Home';
import { FallingLines } from 'react-loader-spinner';
import { getUserSettings } from './backend/UserSettings/UserSettings';
import { loadResponsiveVoice, removeResponsiveVoice } from './backend/ResponsiveVoice/ResponsiveVoice';
const Library = lazy(() => import('./pages/Library'));
const Book = lazy(() => import('./pages/Sub Pages/Book'));
const EBookSearch = lazy(() => import('./pages/EBookSearch'));
const Settings = lazy(() => import('./pages/Settings'));
const Recommendations = lazy(() => import("./pages/Recommendations"));
const ProtectedRoute = lazy(() => import("./components/Routing/ProtectedRoutes"))

function App() {
  const auth = getAuth();
  const { fontSize, fontColor, fontStyle, backgroundColor, user, setUser, firstUserName, setFirstUserName, isOpen, setIsOpen, isAuthenticated, setIsAuthenticated, setBlindMode, setDeafMode, setDefaultMode, setFontSize, setFontColor, setFontStyle, setBackgroundColor, isVoiceEnabled } = useSettings();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isVoiceEnabled) {
      loadResponsiveVoice(isVoiceEnabled);
      // playWelcomeMessage(isVoiceEnabled);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const handleGetUserSettings = async () => {
        let settings = await getUserSettings(user.uid);
        if (settings) {
          setFontSize(settings?.fontSize);
          setFontColor(settings?.fontColor);
          setFontStyle(settings?.fontStyle);
          setBackgroundColor(settings?.backgroundColor);
          setBlindMode(settings?.blindMode);
          setDeafMode(settings?.deafMode);
          setDefaultMode(settings?.defaultMode);
        }
      };
      handleGetUserSettings();
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        localStorage.setItem('token', JSON.stringify(user.getIdToken()));
        // localStorage.setItem('firstName', `${user.firstName}`)
        setUser(user);
        setIsAuthenticated(true);

        // console.log('logged in');
      } else {
        localStorage.clear();
        setIsAuthenticated(false);
        // console.log('no user');
      }
    });
  }, [auth]);

  return (
    <div style={{ fontSize: `${fontSize}px`, color: fontColor, fontFamily: fontStyle, backgroundColor }} className={`font-${fontStyle}`}>
      <BrowserRouter>
        <Suspense fallback={<div className='w-full h-full flex flex-col'>Loading...<FallingLines height="80" width="80" radius="9" color="blue" ariaLabel="three-dots-loading" wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} wrapperClass="my-10" /></div>}>
          <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsOpen={setIsOpen} isOpen={isOpen} firstUserName={firstUserName} setFirstUserName={setFirstUserName} user={user} />} />
            <Route path="/library" element={<Library setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isOpen={isOpen} firstUserName={firstUserName} setFirstUserName={setFirstUserName} user={user} />} />
            <Route path="/book/:id" element={<ProtectedRoute user={isAuthenticated} redirect={"/"}> <Book setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isOpen={isOpen} firstUserName={firstUserName} setFirstUserName={setFirstUserName} user={user} /></ProtectedRoute>} />
            <Route path="/ebooksearch" element={<EBookSearch setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isOpen={isOpen} firstUserName={firstUserName} setFirstUserName={setFirstUserName} user={user} />} />
            <Route path="/settings" element={<Settings setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isOpen={isOpen} firstUserName={firstUserName} setFirstUserName={setFirstUserName} user={user} />} />
            <Route path="/recommendations" element={<Recommendations setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isOpen={isOpen} firstUserName={firstUserName} setFirstUserName={setFirstUserName} user={user} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
