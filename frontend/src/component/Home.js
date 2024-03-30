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
import {toast} from 'react-toastify'


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

	const toggleNotification = () => {
		setIsActive(!isActive);

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

	const addPartyCode = async () => {
		try {
			const uploadData = {
				partyCode,
			};
			const response = await fetch('http://localhost:8081/addPartcodeForUser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(uploadData),
			});

			if (response.ok) {
				toast.success("PartyCode added Successfully");
			} else {
				toast.success("Error adding PartyCode");
			}
		} catch (error) {
			console.error('Error Adding PartyCode', error.message);
			toast("Error adding PartyCode. Please try again.");
		}
		window.location.reload();
	}

	return (
		<>
		    {/* {isAuthenticated && <ToastContainer />} */}
			<div className="dashboard">
			
				<Sidebar />
				<div className="dashboard--content">
					<div className="content--header">
						<h1 className="header--title">Dashboard</h1>
						<div className="header--activity">
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
	);
}

export default Home;
