import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import HandleFileUpload from "./component/HandleFileUpload";
import SelfieUpload from "./component/SelfieUpload";
import LandingPage from "./component/LandingPage";
import Profile from "./component/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<div>hello</div>} />
        <Route path="/Upload" element={<HandleFileUpload />} />
        <Route path="/selfImageUpload" element={<SelfieUpload />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
