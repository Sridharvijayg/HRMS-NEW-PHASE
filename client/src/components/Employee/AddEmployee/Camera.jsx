import React, { useRef } from 'react';
import { BsCamera } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

const Camera = ({ onFileChange,preview,setPreview }) => {
  const fileInputRef = useRef(null);
  

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      onFileChange(file); 
    }
  };

  return (
    <div className="col col-12 col-md-12 col-lg-12">
      <div className="img-cont">
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '100%', height: 'auto' }} />
        ) : null}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        {!preview ? (
          <BsCamera className="camera" onClick={handleCameraClick} />
        ) : (
          <div className="edit-cont">
            <FaRegEdit className="edit" onClick={handleCameraClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
