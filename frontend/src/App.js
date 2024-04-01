import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import HandleFileUpload from "./component/HandleFileUpload";
import SelfieUpload from "./component/SelfieUpload";
import LandingPage from "./component/LandingPage";
import Profile from "./component/Profile";
import { UserProvider } from './context/UserContext';
import Album from "./component/Album";
// var cors = require('cors')
// app.use(cors())

function App() {


  return (
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<div>hello</div>} />
        <Route path="/Upload" element={<HandleFileUpload />} />
        <Route path="/selfImageUpload" element={<SelfieUpload />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/album/:partycode" element={<Album />} />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
