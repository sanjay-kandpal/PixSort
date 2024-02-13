import React, { useState } from 'react';

const FileUploadForm = ({ onFileUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    console.log(formData.getAll('files'));
    // Call a function to handle file upload (passed as a prop)
    onFileUpload(formData);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploadForm;
