import React from "react";
import {BiBookAlt, BiHome, BiKey, BiSolidReport, BiTask} from "react-icons/bi";
import "../src/styles/sidebar.css"
const Sidebar = () =>{
 return(
    <div className="menu">
        <div className="logo">
            <BiBookAlt className="logo-icon"/>
            <h2>PixSort</h2>
        </div>
    
        <div className="menu--list">
            <a href="#" className="item">
                <BiHome className="icon"/>
                <h3>Dashboard</h3>
            </a>
            <a href="#" className="item">
                <BiTask className="icon"/>
                <h3>Share</h3>
            </a>
            <a href="#" className="item">
                <BiSolidReport className="icon"/>
                <h3>Clients</h3>
            </a>
            <a href="#" className="item">
                <BiKey className="icon"/>
                <h3>GenerateCode</h3>
            </a>
        </div>
    </div>
 );
}  
    

export default Sidebar;