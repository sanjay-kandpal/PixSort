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
            <div className="dashboard--content profile-dashboard">
                <div className='personal-information flex_container'>
                    <div className='profile_pic flex_container'>
                     <div className='profile-img'>
                        <img src={ProfilePicture} alt="profile picture" />
                        <div className='profile-user-name'>
                            <span className='name'>Name: {userData.name}</span>
                        </div>
                     </div>
                     <div className='profile-desc'>
                       <div className='prof'>
                            <span className='n'>Email: {userData.email}</span>
                            <br></br>
                            <span className='n'>Password: {userData.password}</span>
                            <br></br>
                            <span className='n'></span>
                            <br></br>

                        </div>
                     </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
