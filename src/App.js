// App.js
import React, { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Home from './pages/Home';
const Library = lazy(() => import('./pages/Library'));
const Book = lazy(() => import('./pages/Sub Pages/Book'));
const Settings = lazy(() => import('./components/Settings'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [firstUserName, setFirstUserName] = useState(null);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        localStorage.setItem('token', JSON.stringify(user.getIdToken()));
        setUser(user);
        setIsAuthenticated(true);
        console.log('logged in');
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        console.log('no user');
      }
    });
  }, [auth]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                firstUserName={firstUserName}
                setFirstUserName={setFirstUserName}
                user={user}
              />
            }
          />
          <Route
            path="/library"
            element={
              <Library
                setIsOpen={setIsOpen}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                isOpen={isOpen}
                firstUserName={firstUserName}
                setFirstUserName={setFirstUserName}
                user={user}
              />
            }
          />
          <Route
            path="/book/:id"
            element={
              <Book
                setIsOpen={setIsOpen}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                isOpen={isOpen}
                firstUserName={firstUserName}
                setFirstUserName={setFirstUserName}
                user={user}
              />
            }
          />
          <Route path="/settings" element={<Settings />} /> {/* New settings route */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
