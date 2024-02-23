import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Sidebar from "./Sidebar";
import { BiSearch } from "react-icons/bi";
import "../styles/fileUpload.css"

const dropzoneStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "20px",
	marginTop: "2rem",
	borderWidth: "2px",
	borderRadius: "2px",
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border 0.24s ease-in-out",
	cursor: "pointer",
	width: "76vw",
	margin: "2rem",
};

const activeDropzoneStyle = {
	borderColor: "#00adb5",
};

const FileUpload = () => {
	const [files, setFiles] = useState([]);
	const [partyCode, setPartyCode] = useState("");
	const [title, setTitle] = useState("");

	useEffect(() => {
		setPartyCode(generatePartyCode());
	}, []);

	const generatePartyCode = () => {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let partyCode = "";
		for (let i = 0; i < 5; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			partyCode += characters.charAt(randomIndex);
		}
		return partyCode;
	};

	const onDrop = useCallback((acceptedFiles) => {
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);

	const onUploadClick = () => {
		// Add your upload logic here, for example, sending files to the server.
		console.log("Uploading files:", files);
		// Clear the files after uploading if needed.
		setFiles([]);
	};

	const copyButtonClicked = (e) => {
		e.currentTarget.classList.toggle("fadeanime")
		navigator.clipboard.writeText(partyCode)
		console.log("click")
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: "image/*",
		// maxSize: 1024 * 1024 * 5,
		// maxFiles: 2000,
	});

	const fileList = files.map((file) => (
		<li className="ListItem" key={file.name}>
			<img className="ImagePreview" src={file.preview} alt={file.name} />
			<span className="FileName" >{file.name}</span>
		</li>
	));

	return (
		<div className="dashboard">
			<Sidebar />
			<div className="d-flex flex-column">
				<div className="partyCodeDiv">
					<input type="text" placeholder="Title" className="titleInput" value={title} />
					<b>Party Code:</b> {partyCode} <svg xmlns="http://www.w3.org/2000/svg" className="copyIcon" style={{ width: "1.3rem", margin: "0px 1rem" }} onClick={copyButtonClicked} viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" /></svg>
				</div>
				<div
					style={
						isDragActive
							? { ...dropzoneStyle, ...activeDropzoneStyle }
							: dropzoneStyle
					}
					{...getRootProps()}
				>
					<input {...getInputProps()} />
					<p className="DropzoneText" >
						Drag and drop your files here, or click to select files
					</p>
					<ul className="ImageContainer">{fileList}</ul>
				</div>
				<button className="uploadButton" onClick={onUploadClick}>
					Upload
				</button>
			</div>
		</div>
	);
};

export default FileUpload;
