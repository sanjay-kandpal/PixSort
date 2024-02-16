import React from "react";
import {BiBookAlt, BiHome} from "react-icons/bi";
import { FaShareAltSquare,FaCloudUploadAlt } from "react-icons/fa";
import "../src/styles/sidebar.css"
import {Link} from "react-router-dom";
import { FaUsersViewfinder } from "react-icons/fa6";
const Sidebar = () =>{
 return(
    <div className="menu">
        <div className="logo">
            <BiBookAlt className="logo-icon"/>
            <h2>PixSort</h2>
        </div>
        <div className="menu--list">
            <Link to="/" className="item">
                <BiHome className="icon"/>
                <h3>Dashboard</h3>
            </Link>
            <Link to="/Upload" className="item">
                <FaCloudUploadAlt  className="icon"/>
                <h3>Upload</h3>
            </Link>
            <a href="#" className="item">
                <FaUsersViewfinder className="icon"/>
                <h3>Clients</h3>
            </a>
            <Link to="#" className="item">
                <FaShareAltSquare className='icon' />
                <h3>Share</h3>
            </Link>
        </div>
    </div>
 );
}  
    

export default Sidebar;