import axios from "axios";
import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ImProfile } from "react-icons/im";
import Content from "./Content";
import "../App.css";
import { CgProfile } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa"
// import { UserContext } from "../context/UserContext";


function Home() {

	const [name, setName] = useState("");
	const [userId, setUserId] = useState("");
	const [partyCode, setPartyCode] = useState("");
	const [isActive, setIsActive] = useState(false);
	const [isAuthenticated, setAuthentic] = useState(false);
	const [codes, setCodes] = useState({});
	const navigate = useNavigate();

	axios.defaults.withCredentials = true;

	useEffect(() => {
		axios
			.get("http://localhost:8081/")
			.then((res) => {
				console.log(res);
				if (res.data.valid === true) {
					setName(res.data.username);
					setUserId(res.data.cookie.userid);
					setAuthentic(true);
					setCodes(res.data.userCodes)
					// console.log(codes[0])
				} else {
					navigate("/Login");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [isAuthenticated]);

	// const handleIconClick = async () => {
	// 	console.log("Logout");
	// 	try {
	// 		const response = await fetch("http://localhost:8081/signout", {
	// 			method: "POST",
	// 			credentials: "include", // Include cookies in the request
	// 		});
	// 		console.log(response);
	// 		if (response.ok) {
	// 			// Handle successful sign-out (redirect, etc.)s
	// 			setAuthentic(false);
	// 			navigate("/login");
	// 		} else {
	// 			// Handle sign-out failure
	// 			console.error("Sign-out failed:", response.statusText);
	// 		}
	// 	} catch (error) {
	// 		console.error("Sign-out error:", error.message);
	// 	}
	// };

	const toggleNotification = () => {
		setIsActive(!isActive);

		// Simulating notifications
		const notifications = document.querySelectorAll(".notification");

		notifications.forEach((notification) => {
			notification.classList.add("show");
		});

		setTimeout(() => {
			notifications.forEach((notification) => {
				notification.classList.remove("show");
			});
			setIsActive(false);
		}, 3000);
	};

	const addPartyCode = () => {
		alert("Added");
	}

	// const UserProvider = ({ children, value }) => {
	// 	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
	// };

	return (
		// <UserProvider value={{ username: name, userid: userId }}>
		<>
			<div className="dashboard">
				<Sidebar />
				<div className="dashboard--content">
					<div className="content--header">
						<h1 className="header--title">Dashboard</h1>
						<div className="header--activity">
							{/* <div className={`notification-container ${isActive ? "active" : ""}`} >
								<CgProfile
									className="icon profile_icon"
									onClick={toggleNotification}
								/>
								<div className="notification-dropdown">
									<div className="notification" id="notification1">
										<ImProfile />
										Profile
									</div>
									<div
										className="notify notification"
										id="notification2"
										onClick={handleIconClick}
									>
										<FaSignOutAlt className="icon" />
										Exit
									</div>
								</div>
							</div> */}
							<div className="search-box">
								<input type="text" placeholder="Enter Party Code here" value={partyCode} onChange={(e) => { setPartyCode(e.target.value) }} />
								<BiSearch className="icon" onClick={addPartyCode} />
							</div>
						</div>
					</div>
					<Content codes={codes} />
				</div>
			</div>
		</>
		// </UserProvider>
	);
}

export default Home;
