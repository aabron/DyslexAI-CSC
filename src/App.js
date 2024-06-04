import logo from './logo.svg';
import { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
