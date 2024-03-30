import React from 'react'
import Sidebar from './Sidebar'
import "../styles/profile.css"
import ProfilePicture from "../images/profilePicture.jpg"
import { useUserData } from '../context/UserContext';

function Profile() {
    const { userData } = useUserData();
	console.log(userData)
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
                            <div className="name">{userData.name}</div>
                            <div className="email">{userData.email[0]}</div>
                            <div className="mobile">{userData.password[0]}</div>
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
