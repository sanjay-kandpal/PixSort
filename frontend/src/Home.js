import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile";
import "./App.css";
import { BiSearch } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
function Home(){
    const [name,setName] = useState('');
    const [isAuthenticated,setAuthentic] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then((res) => {
            console.log(res);
            if(res.data.valid === true){
               setName(res.data.username)
               setAuthentic(true);
            }else{
                navigate('/Login');
            }
            
        })
        .catch((err) => {
            console.log(err);
        })
    },[isAuthenticated])
    const handleIconClick = async () => {
                console.log('Logout');
        try {
            const response = await fetch('http://localhost:8081/signout', {
              method: 'POST',
              credentials: 'include', // Include cookies in the request
            });
            console.log(response);
            if (response.ok) {
              // Handle successful sign-out (redirect, etc.)s
               setAuthentic(false)
                navigate('/login');
              
            } else {
              // Handle sign-out failure
              console.error('Sign-out failed:', response.statusText);
            }
          } catch (error) {
            console.error('Sign-out error:', error.message);
          }
    };
    return(
        <>
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard--content">
                <div className="content--header">
                     <h1 className="header--title">Dashboard</h1>
                        <div className="header--activity">
                            <div className="search-box">
                                <input type="text" placeholder="Search anything here..." />
                                <BiSearch className="icon" />
                            </div>
                            <div className="notify">
                                <FaSignOutAlt  className="icon" onClick={handleIconClick} />
                            </div>
                        </div>
                </div>
                    <Content />            
            </div>
        </div>
        <Profile />
        </>
    )
}

export default Home;