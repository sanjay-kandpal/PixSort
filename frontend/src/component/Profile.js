import React from 'react'
import Sidebar from './Sidebar'
import "../styles/profile.css"
import ProfilePicture from "../images/profilePicture.jpg"

function Profile() {
    return (
        <div className='dashboard'>
            <Sidebar />
            <div className="dashboard--content">
                <div className="content--header">
                    <h1 className="header--title">Profile</h1>
                </div>
                <div className="profileContainer">
                    <div className="profileCard">
                        <div className="imageDiv">
                            <img src={ProfilePicture} alt="profile photo" />
                        </div>
                        <div className="infoContainer">
                            <div className="name">Adhish Bahl</div>
                            <div className="email">adhishbahl0gmail.com</div>
                            <div className="mobile">9462849725</div>
                            <div className="gender">Male</div>
                        </div>
                        <div className="btn-container">
                            <button>Edit Profile</button>
                            <button>Upload Image</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
