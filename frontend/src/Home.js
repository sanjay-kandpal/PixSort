import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile";
import "./App.css";
function Home(){
    const [name,setName] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then((res) => {
            console.log(res);
            if(res.data.valid === true){
               setName(res.data.username)
            }else{
                navigate('/Login');
            }
            
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
    return(
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard--content">
              <Content />
              <Profile />
            </div>
        </div>
        
    )
}

export default Home;