import React from 'react';
import { Link } from "react-router-dom";
import './LandingPage.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import logo from '../src/styles/logo.png'
import { CiLock } from "react-icons/ci";

function LandingPage () {
    return (
        <header>
        <div className='landing_header'>
            <div className="header_logo">
                <img src={logo} style={{ border: "0px" }}/>
            </div>
            <nav className='landing_nav'>
                <ul>
                    <li><a href="/login">Home</a></li>
                    <li><a href="/login">Pricing</a></li>
                    <li><a href="/login">FAQ</a></li>
                    <div class="dropdown" >
                        <p class="dropbtn">Use for <RiArrowDropDownLine /></p>
                            <div class="dropdown-content">
                                <Link to="#">Wedding</Link>
                                <Link to="#">Private Events</Link>
                                <Link to="#">College Events</Link>
                                <Link to="#">Sporting Events</Link>
                                <Link to="#">Social Clubs</Link>
                                <Link to="#">Corporate Events</Link>
                                <Link to="#">Lounges or Hotels</Link>
                            </div>
                    </div>
                    <button className="landing_Getbtn btn btn-outline-dark">Get in Touch</button>
                </ul>
            </nav>
            <div className='landing_Login'>
                <Link to="/login"><CiLock className='icon'/>Login</Link>
            </div>
        </div>
        </header>
    )
}

export default LandingPage;