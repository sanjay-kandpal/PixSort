import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import LandingPage from './LandingPage';
import HandleFileUpload from './HandleFileUpload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path='/Upload' element={<HandleFileUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
