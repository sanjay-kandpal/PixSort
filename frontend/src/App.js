<<<<<<< HEAD
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import LandingPage from './LandingPage';
import HandleFileUpload from './HandleFileUpload';


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import HandleFileUpload from "./component/HandleFileUpload";
>>>>>>> ec5749685f49bbc7162c558b485509a869324de7
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/landing" element={<LandingPage />} />
        <Route path='/Upload' element={<HandleFileUpload />} />
=======
        <Route path="/home" element={<div>hello</div>} />
        <Route path="/Upload" element={<HandleFileUpload />} />
>>>>>>> ec5749685f49bbc7162c558b485509a869324de7
      </Routes>
    </BrowserRouter>
  );
}

export default App;
