const cookieParser = require('cookie-parser');
const express = require('express')
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookie = require('cookie');
// import axios from "axios";
const axios = require('axios');
// // const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const JSZip = require('jszip');

const app = express();

app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST", "OPTIONS"],
	credentials: true
}));

var userid = 0;

app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}))

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const BUCKET_NAME = process.env.BUCKET_NAME
const REGION = process.env.REGION
const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET_KEY = process.env.SECRET_KEY


app.post('/signout', (req, res) => {
	// Destroy the session on the server
	userid = 0;
	req.session.destroy((err) => {
		if (err) {
			console.error('Error destroying session:', err);
			return res.status(500).send('Internal Server Error');
		}

		// Clear the session cookie on the client
		res.clearCookie('connect.sid');
		return res.status(200).send('OK');
	});
});

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root123",
	database: "signup"
})

db.connect((err) => {
	if (err) {
		console.error('Error connecting to MySQL database:', err);
	} else {
		console.log('Connected to MySQL database');
	}
});


// Handle file upload
// app.post('/upload', upload.array('files'), async (req, res) => {
//   try {
//     // Access uploaded files in req.files array
//     const files = req.files;

//     // Create a random directory
//     const randomDirectory = createRandomDirectory();
//     await fs.mkdir(randomDirectory);

//     // Process and save files to the random directory
//     const uploadedFiles = [];
//     for (const file of files) {
//       const filename = `${file.originalname}`;
//       const filePath = path.join(randomDirectory, filename);

//       // Save file to disk
//       await fs.writeFile(filePath, file.buffer);

//       uploadedFiles.push({
//         originalname: file.originalname,
//         filename: filename,
//         filePath: filePath,
//       });
//     }
//     const randomCode = path.basename(randomDirectory);

//     // Send a response with information about the uploaded files and directory
//     res.status(200).json({ message: 'Files uploaded successfully', randomCode: randomCode });
//   } catch (error) {
//     // Handle errors
//     console.error('An error occurred during file upload:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.post('/signup', async (req, res) => {
	try {
		const sql1 = "INSERT INTO signup(`name`,`email`,`password`) VALUES (?)";
		const values = [req.body.name, req.body.email, req.body.password];
		await db.query(sql1, [values]);

		try {

			const sql = "SELECT * FROM signup WHERE `email` = ? AND `password` = ?";
			db.query(sql, [req.body.email, req.body.password], async (err, data) => {
				if (err) {
					console.log(err.message)
					return res.json({ error: err.message });
				}
				if (data.length > 0) {
					const useridTemp = data[0].id;
					userid = useridTemp
					console.log("Check from signup: " + userid)
					const sql3 = "INSERT INTO user_access(`userid`,`partycode`) VALUES (?, '{}')";
					const values = [useridTemp];
					await db.query(sql3, [values]);

					return res.json({ message: true });


				} else {
					return res.json({ message: false });
				}
			})

		} catch (error) {
			console.error(error.message);
			return res.json({ error: error.message });
		}

	} catch (error) {
		console.error(error.message);
		return res.json({ error: error.message });
	}
});

// app.post('/signup', (req, res) => {
// 	const sql = "INSERT INTO signup(`name`,`email`,`password`) VALUES (?)";
// 	const values = [
// 		req.body.name,
// 		req.body.email,
// 		req.body.password
// 	]
// 	console.log(values);
// 	db.query(sql, [values], (err, data) => {
// 		if (err) {
// 			console.log(err.message);
// 			return res.json({ error: err.message });
// 		} else {
// 			const sql2 = "SELECT * FROM signup WHERE `email` = ? AND `password` = ?";
// 			db.query(sql2, [req.body.email, req.body.password], (err, data) => {
// 				if (err) {
// 					console.log(err.message);
// 					return res.json({ error: err.message });
// 				}
// 				if (data.length > 0) {
// 					console.log("122: data" + data)
// 					const useridTemp = data[0].id;
// 					const sql3 = "INSERT INTO user_access(`id`,`partycode`) VALUES (?, '[]')";
// 					db.query(sql3, useridTemp, (err, data) => {
// 						if (err) {
// 							console.log(err.message);
// 							return res.json({ error: err.message });
// 						}
// 						console.log(data);
// 						return res.json(data);
// 					})
// 				} else {
// 					console.log(err.message);
// 					return res.json({ error: err.message });
// 				}
// 			})
// 		}
// 	})

// })

app.get('/', (req, res) => {

	// if (req.session.username) {

	// 	const sql = "SELECT * FROM user_access WHERE `userid` = ?";
	// 	db.query(sql, userid, (err, data) => {
	// 		if (err) {
	// 			console.log(err.message);
	// 			return res.json({ valid: false, error: err.message });
	// 		}

	// 		if (data.length > 0) {
	// 			let codes = JSON.parse(data[0].partycode)
	// 			console.log(codes.length)

	// 			if (codes.length === 0) {
	// 				// Handle the case where partycode array is empty
	// 				// return res.json({ valid: false, error: 'Partycode array is empty' });
	// 				return res.json({ valid: true, username: req.session.username, cookie: req.cookies, userCodes: [] });
	// 			}

	// 			const placeholders = Array.from({ length: codes.length }, (_, i) => '?').join(',');

	// 			const sql = `SELECT partycode, title FROM albums WHERE \`partycode\` IN (${placeholders})`;
	// 			db.query(sql, codes, (err, data) => {
	// 				if (err) {
	// 					return res.json({ valid: false, error: err.message });
	// 				}
	// 				if (data.length > 0) {
	// 					const userCodes = data.map(row => ({ title: row.title, partycode: row.partycode }));
	// 					return res.json({ valid: true, username: req.session.username, cookie: req.cookies, userCodes: userCodes });
	// 				} else {
	// 					return res.json({ valid: false });
	// 				}
	// 			})

	// 		} else {
	// 			return res.json({ valid: false });
	// 		}
	// 	})

	// } else {
	// 	return res.json({ valid: false });
	// }




	if (req.session.username) {
		const sql = "SELECT partycode FROM user_access WHERE `userid` = ?";
		db.query(sql, userid, (err, data) => {
			if (err) {
				console.log(err.message);
				return res.json({ valid: false, error: err.message });
			}

			if (data.length > 0) {
				let codes = JSON.parse(data[0].partycode);
				const userCodes = Object.keys(codes); // Retrieve just the keys from the JSON object

				if (userCodes.length === 0) {
					return res.json({ valid: true, username: req.session.username, cookie: req.cookies, userCodes: [] });
				}

				const placeholders = Array.from({ length: userCodes.length }, (_, i) => '?').join(',');

				const sql = `SELECT partycode, title FROM albums WHERE \`partycode\` IN (${placeholders})`;
				db.query(sql, userCodes, (err, data) => {
					if (err) {
						return res.json({ valid: false, error: err.message });
					}
					if (data.length > 0) {
						const userCodesWithTitles = data.map(row => ({ title: row.title, partycode: row.partycode }));
						return res.json({ valid: true, username: req.session.username, cookie: req.cookies, userCodes: userCodesWithTitles });
					} else {
						return res.json({ valid: false });
					}
				});

			} else {
				return res.json({ valid: false });
			}
		});

	} else {
		return res.json({ valid: false });
	}


})

app.get('/getUserData', (req, res) => {

	const sql = "SELECT * FROM signup WHERE `id` = ?";
	console.log("Check: " + userid)
	db.query(sql, [userid], (err, data) => {
		console.log(data)
		if (err) {
			console.log(err.message)
			return res.json({ error: err.message });
		}
		if (data.length > 0) {
			console.log(data[0].id)
			console.log(data[0].name)

			return res.json({
				id: data[0].id,
				name: data[0].name
			});
		} else {
			return res.json({ message: false });
		}
	})
})

app.post('/login', (req, res) => {
	const sql = "SELECT * FROM signup WHERE `email` = ? AND `password` = ?";

	console.log(req.body.email, req.body.password)
	db.query(sql, [req.body.email, req.body.password], (err, data) => {
		console.log("inlogin")
		if (err) {
			console.log(err.message)
			return res.json({ error: err.message });
		}
		if (data.length > 0) {
			console.log('true')
			req.session.username = data[0].name;
			req.session.userid = data[0].id;
			userid = req.session.userid;
			console.log(req.session.username);
			console.log(req.session.userid);

			return res.json({ message: true, email: req.body.email, password: req.body.password, name: data[0].name });
		} else {
			return res.json({ message: false });
		}
	})
})

app.post('/getImageList', (req, res) => {
	const { partycode } = req.body;
	// const userid = req.session.userid;

	if (!partycode || !userid) {
		return res.status(400).json({ error: 'Missing partycode or userid' });
	}

	const sql = "SELECT partycode FROM user_access WHERE `userid` = ?";
	db.query(sql, [userid], (err, data) => {
		if (err) {
			console.error(err.message);
			return res.status(500).json({ error: err.message });
		}
		if (data.length > 0) {
			let codes = JSON.parse(data[0].partycode);
			if (codes.hasOwnProperty(partycode)) {
				const images = codes[partycode];
				return res.status(200).json({ images });
			} else {
				return res.status(404).json({ error: 'Party code not found' });
			}
		} else {
			return res.status(404).json({ error: 'User not found' });
		}
	});
});

app.post('/addPartcodeForUser', async (req, res) => {
	console.log(req.body.partyCode);
	const partycode = req.body.partyCode;


	// try {
	// 	const response = await axios.post("https://38sglfeq52.execute-api.us-east-1.amazonaws.com/prod/compareFaces/", {
	// 	// const response = await axios.post("arn:aws:execute-api:us-east-1:533267403922:38sglfeq52/*/OPTIONS/compareFaces", {
	// 		userid: userid,
	// 		partycode: partycode
	// 	});
	// 	// setResponseData(response.data);
	// 	console.log(response.data)
	// 	res.status(200).json({ message: 'Upload successful', res: response });
	// 	// res.status(200).json({ message: 'Upload successful', user: userid });
	//   } catch (error) {
	// 	res.status(401).json({ error: 'Unauthorized' });
	// 	console.error("Error:", error);
	//   }

	// try {
	// 	const response = await fetch('https://38sglfeq52.execute-api.us-east-1.amazonaws.com/prod/compareFaces', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'userid': userid,
	// 			'partycode': partycode
	// 		},
	// 		body: JSON.stringify({})
	// 	});

	// 	const data = await response.json();
	// 	res.json(data);
	// 	console.log(response)
	// } catch (error) {
	// 	console.error('Error:', error);
	// 	res.status(500).json({ error: 'Internal Server Error' });
	// };

	imageList = ['IMG20230909115049.jpg', 'WIN_20230216_09_22_13_Pro.jpg', 'shivanshi.jpg']








	// try {
	// 	const apiUrl = 'https://38sglfeq52.execute-api.us-east-1.amazonaws.com/prod/compareFaces/';

	// 	const postData = {
	// 	  userid: userid,
	// 	  partycode: partycode
	// 	};

	// 	const response = await axios.post(apiUrl, postData);

	// 	// Handle response from the API Gateway
	// 	console.log('Response from API Gateway:', response.data);

	// 	// Return response data if needed
	// 	// return response.data;
	//   } catch (error) {
	// 	// Handle errors
	// 	console.error('Error making POST request:', error);
	// 	throw error; // Rethrow error if needed
	//   }


	// fetch(`https://38sglfeq52.execute-api.us-east-1.amazonaws.com/prod/compareFaces/userid=${userid}&partycode=${partycode}`, {
	// fetch(`https://38sglfeq52.execute-api.us-east-1.amazonaws.com/prod/compareFaces/`, {
	//   method: 'POST',
	//   headers: {
	//     'Accept': 'application/json',
	//     'Content-Type': 'application/json'
	//   },
	// //   body: JSON.stringify{
	//   body: {
	// 	userid: userid, 
	// 	partycode: partycode
	// }
	// });


	// fetch(`https://38sglfeq52.execute-api.us-east-1.amazonaws.com/prod/compareFaces/`, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Accept': 'application/json',
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify({
	// 		userid: userid,
	// 		partycode: partycode
	// 	})
	// })
	// 	.then(response => {
	// 		if (!response.ok) {
	// 			throw new Error('Network response was not ok');
	// 		}
	// 		return response.json();
	// 	})
	// 	.then(data => {
	// 		console.log('Response from API:', data);
	// 	})
	// 	.catch(error => {
	// 		console.error('There was a problem with the fetch operation:', error);
	// 	})



	// fetch(`https://38sglfeq52.execute-api.us-east-1.amazonaws.com/prod/compareFaces/`, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Accept': 'application/json',
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify({
	// 		userid: userid,
	// 		partycode: partycode
	// 	})
	// })
	// 	.then(response => {
	// 		if (!response.ok) {
	// 			throw new Error('Network response was not ok');
	// 		}
	// 		return response.json();
	// 	})
	// 	.then(data => {
	// 		console.log('Response from API:', data);
	// 	})
	// 	.catch(error => {
	// 		console.error('There was a problem with the fetch operation:', error);
	// 	})










	//FINAL - THIS IS WORKING

	// const sql1 = "SELECT partycode FROM user_access WHERE `userid` = ?";
	// db.query(sql1, [userid], (err, data) => {
	// 	if (err) {
	// 		console.error('MySQL query error:', err);
	// 		res.status(500).json({ error: 'Internal Server Error' });
	// 	}
	// 	console.log(data)
	// 	if (data.length > 0) {
	// 		let codes = JSON.parse(data[0].partycode)
	// 		codes.push(partycode)
	// 		console.log(codes)
	// 		let codeString = JSON.stringify(codes)


	// 		const sql2 = 'update user_access set partycode=? WHERE USERID=?;';
	// 		if (userid != 0) {
	// 			db.query(sql2, [codeString, userid], (err, result) => {
	// 				if (err) {
	// 					console.error('MySQL query error:', err);
	// 					res.status(500).json({ error: 'Internal Server Error' });
	// 				} else {
	// 					console.log('Upload data inserted into MySQL');
	// 					res.status(200).json({ message: 'Upload successful', user: userid });
	// 				}
	// 			});
	// 		} else {
	// 			res.status(401).json({ error: 'Unauthorized' });
	// 		}

	// 	} else {
	// 		console.error('MySQL query error:', err);
	// 		res.status(500).json({ error: 'Internal Server Error' });
	// 	}
	// })


	const sql1 = "SELECT partycode FROM user_access WHERE `userid` = ?";
	db.query(sql1, [userid], (err, data) => {
		if (err) {
			console.error('MySQL query error:', err);
			res.status(500).json({ error: 'Internal Server Error' });
			return;
		}

		let partyCodeJSON = {};
		if (data.length > 0) {
			partyCodeJSON = JSON.parse(data[0].partycode || '{}');
		}

		// Add or update the list of images for the given party code
		partyCodeJSON[partycode] = imageList;

		// Convert the JSON object back to a string
		const updatedPartyCodeString = JSON.stringify(partyCodeJSON);

		const sql2 = 'UPDATE user_access SET partycode=? WHERE userid=?;';
		db.query(sql2, [updatedPartyCodeString, userid], (err, result) => {
			if (err) {
				console.error('MySQL query error:', err);
				res.status(500).json({ error: 'Internal Server Error' });
				return;
			}

			console.log('Upload data inserted into MySQL');
			res.status(200).json({ message: 'Upload successful', user: userid });
		});
	});



})

app.post('/upload', (req, res) => {
	const { partyCode, title } = req.body;


	const sql = 'INSERT INTO albums (partyCode, title, date, owner) VALUES (?, ?, NOW(), ?)';

	if (userid != 0) {
		db.query(sql, [partyCode, title, userid], (err, result) => {
			if (err) {
				console.error('MySQL query error:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			} else {

				const sql2 = "SELECT partycode FROM user_access WHERE `userid` = ?";
				db.query(sql2, userid, (err, data) => {
					if (err) {
						console.error('MySQL query error:', err);
						res.status(500).json({ error: 'Internal Server Error' });
					}
					if (data.length > 0) {
						let codes = JSON.parse(data[0].partycode) || {}









						
						imageList = ['IMG20230909115049.jpg', 'WIN_20230216_09_22_13_Pro.jpg', 'shivanshi.jpg']
						codes[partyCode] = imageList
						console.log(codes)
						let codeString = JSON.stringify(codes)


						const sql3 = 'update user_access set partycode=? WHERE USERID=?;';
						if (userid != 0) {
							db.query(sql3, [codeString, userid], (err, result) => {
								if (err) {
									console.error('MySQL query error:', err);
									res.status(500).json({ error: 'Internal Server Error' });
								} else {
									console.log('Upload data inserted into MySQL');
									res.status(200).json({ message: 'Upload successful', user: userid });
								}
							});
						} else {
							res.status(401).json({ error: 'Unauthorized' });
						}

					} else {
						console.error('MySQL query error:', err);
						res.status(500).json({ error: 'Internal Server Error' });
					}
				})
				// console.log('Upload data inserted into MySQL');
				// res.status(200).json({ message: 'Upload successful', user: userid });
			}
		});
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
});




app.listen(8081, () => {
	console.log('listening');
})