import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Registration from './Registration';
import Login from './Login';
import Home from './Home';
import NotFound from './NotFound'; // Import the 404 component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
