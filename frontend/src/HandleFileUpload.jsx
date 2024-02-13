import React from 'react';
import FileUploadForm from './FileUploadForm'; // Adjust the import path accordingly

const App = () => {
  
  // Define the function to handle file upload
  const handleFileUpload = async (formData) => {
    try {
      // Make a POST request to your server with the formData
      const response = await fetch('http://localhost:8081/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful upload
        console.log('Files uploaded successfully');
      } else {
        // Handle upload failure
        console.error('Upload failed');
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('An error occurred during file upload:', error);
    }
  };

  return (
    <div>
      <h1>Multiple File Upload</h1>
      <FileUploadForm onFileUpload={handleFileUpload} />
    </div>
  );
};

export default App;
