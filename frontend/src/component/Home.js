import axios from "axios";
import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

import Content from "./Content";
import "../App.css";

import { BiSearch } from "react-icons/bi";

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

		// try {
		// 	const response = await fetch(`https://38sglfeq52.execute-api.us-east-1.amazonaws.com/prod/compareFaces`, {
		// 	// const response = await fetch(`https://38sglfeq52.execute-api.us-east-1.amazonaws.com/prod/compareFaces?userid=2&partycode=0RQN1`, {
		// 	  method: 'POST',
		// 		mode: 'no-cors',
		// 	  headers: {
		// 		'Content-Type': 'application/json',
		// 		'Access-Control-Allow-Origin': '*',
		// 	  },
		// 	//   body: JSON.stringify({ 
		// 	  body:  {
		// 		userid: userId,
		// 		partycode: partyCode
		// 	  }
		// 	//    })
		// 	});
		
		// 	const data = await response;
		// 	// res.json(data);
		// 	console.log(response)
		//   } catch (error) {
		// 	console.error('Error:', error);
		// 	// res.status(500).json({ error: 'Internal Server Error' });
		//   }



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
				toast.error("Error adding PartyCode");
			}
		} catch (error) {
			console.error('Error Adding PartyCode', error.message);
			toast("Error adding PartyCode. Please try again.");
		}
		// window.location.reload();
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
