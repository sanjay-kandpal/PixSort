import React, { useState, useRef } from 'react';

const FileUploadForm = ({ onFileUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [previewKey, setPreviewKey] = useState(0); // Add previewKey state
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

    // Update the selected files state
    setSelectedFiles(files);

    // Generate file previews
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push({ file: files[i], preview: event.target.result, selected: false });
        // Set the file previews state
        setFilePreviews([...previews]);
      };
      reader.readAsDataURL(files[i]);
    }

    // Increment previewKey to reset previews when files change
    setPreviewKey((prevKey) => prevKey + 1);
  };

  const handleCheckboxChange = (index) => {
    const updatedPreviews = [...filePreviews];
    updatedPreviews[index].selected = !updatedPreviews[index].selected;
    setFilePreviews(updatedPreviews);
  };

  const handleUpload = () => {
    // Check if at least one file is selected
    if (selectedFiles.length === 0) {
      alert('Select images.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < filePreviews.length; i++) {
      if (filePreviews[i].selected) {
        formData.append('files', filePreviews[i].file);
      }
    }
    // Convert FormData to array and get its length
    const formDataArray = [...formData.entries()];
    const formDataLength = formDataArray.length;
    if(formDataLength > 0){
      // Call a function to handle file upload (passed as a prop)
      onFileUpload(formData);
    }else{
      alert('Select images.');
      return;
    }

    
    

    // Reset the file input to default value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Reset the file previews to default value
    setFilePreviews([]);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} key={previewKey} />
      
      {/* Display file previews with checkboxes */}
      {filePreviews.map((preview, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={preview.selected}
            onChange={() => handleCheckboxChange(index)}
          />
          <img
            src={preview.preview}
            alt={`Preview ${index}`}
            style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
          />
        </div>
      ))}

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploadForm;
