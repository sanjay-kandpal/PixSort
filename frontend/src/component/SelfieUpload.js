import { React, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
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


function SelfieUpload() {

    const [files, setFiles] = useState([]);

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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        minFiles: 2,
        // maxSize: 1024 * 1024 * 5,
        maxFiles: 4,
    });

    const fileList = files.map((file) => (
        <li className="ListItem" key={file.name}>
            <img className="ImagePreview" src={file.preview} alt={file.name} />
            <span className="FileName" >{file.name}</span>
        </li>
    ));

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 selfieInstructionsContainer">
            <div className="selfieInstructions">
                Upload your minimum 2 SOLO Selfies
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

            <div className="selfieInstructions">
                Impotant Points to take care:
            </div>
            <div className="selfieDesc">
                <ul className="descList">
                    <li className="descListItem">There should be no other person in the image you upload, it should just be you.</li>
                    <li className="descListItem">Make sure that the image is not from too far and your face is clearly visible.</li>
                    <li className="descListItem">Try to upload images from two different pictures.</li>
                    <li className="descListItem">Make sure that the surrounds are well lit up and face is not dark in the picture.</li>
                </ul>
            </div>
        </div>
    )
}

export default SelfieUpload
