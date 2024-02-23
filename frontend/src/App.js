import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import HandleFileUpload from "./component/HandleFileUpload";
import LandingPage from "./component/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<div>hello</div>} />
        <Route path="/Upload" element={<HandleFileUpload />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
