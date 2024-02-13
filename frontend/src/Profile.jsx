import React from "react";
import ProfileHeader from "./ProfileHeader";
import "../src/styles/profile.css";

const experience =[
    {
        id:1,
        company:"Freelancer",
        experience: "2yrs"
    },
]
const Profile = () => {
    return (
        <div className="profile">
         <div className="user--detail">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user" className="user-image" ></img>
            <h3 className="username">John Doe</h3>
            <ProfileHeader />
            <span className="profession">PhotoGrapher</span>
            <div className="user--info">
             {experience.map((item) => (
                    <div className="user--experience">
                        <p>{item.company}</p>
                        <p>{item.experience}</p>
                    </div>
                ))}
            </div>
         </div>
            {/* <ProfileHeader /> */}
        </div>
    );
}
export default Profile;