import React from 'react';
import Sidebar from './Sidebar';
import "../styles/profile.css";
import ProfilePicture from "../images/profilePicture.jpg";
import { useUserData } from '../context/UserContext';
import AuthMiddleware from './AuthMiddleware';

function Profile() {
    AuthMiddleware()
  const { userData } = useUserData();
  const name = userData?.name ?? 'N/A'; // Use 'N/A' if name is null or undefined
  const email = userData?.email ?? 'N/A'; // Use 'N/A' if email is null or undefined

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboard--content profile-dashboard">
        <div className='personal-information flex_container'>
          <div className='profile_pic flex_container'>
            <div className='profile-img'>
              <img src={ProfilePicture} alt="profile picture" />
              <div className='profile-user-name'>
                <span className='name'>Name: {name}</span>
              </div>
            </div>
            <div className='profile-desc'>
              <div className='prof'>
                <span className='n'>Email: {email}</span>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;