import logo from './logo.svg';
import { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import React from 'react';
import Home from './pages/Home';
const Library = lazy(() => import('./pages/Library'));
const Book = lazy(() => import('./pages/Sub Pages/Book'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
        setIsAuthenticated(true);
        console.log('logged in');
      }
      else {
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
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsOpen={setIsOpen} isOpen={isOpen}/>} />
          <Route path="/library" element={<Library setIsOpen={setIsOpen} isAuthenticated={isAuthenticated}/>} />
          <Route path="/book/:id" element={<Book setIsOpen={setIsOpen} isAuthenticated={isAuthenticated}/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>

  );
}

export default App;
