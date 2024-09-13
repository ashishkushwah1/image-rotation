import React, { useState, useRef } from 'react';
import axios from 'axios';

function App() {
  const [warning, setWarning] = useState(''); // For storing warning messages
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [rotatedImageUrl, setRotatedImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Allowed file types and max size
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const maxFileSize = 100 * 1024; // 100KB

  const handleSubmit = async (event) => {
    event.preventDefault();

    const file = fileInputRef.current.files[0];
    if (!file) {
      setWarning('Please select a file!');
      return;
    }

    // Validate file type
    if (!allowedFileTypes.includes(file.type)) {
      setWarning('Invalid file type. Only JPEG and PNG files are allowed.');
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setWarning(`File size too large. Maximum size allowed is 100KB.`);
      return;
    }

    // Clear warnings if all validations pass
    setWarning('');

    // Prepare FormData and send to the backend
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { originalImageUrl, rotatedImageUrl } = response.data;
      setOriginalImageUrl(originalImageUrl);
      setRotatedImageUrl(rotatedImageUrl);
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Upload and Rotate Image</h2>

      {warning && (
        <div className="text-red-500 mb-4">
          {warning} {/* Show warning if validation fails */}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="file"
          ref={fileInputRef}
          className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
          accept="image/jpeg, image/png" // Only allow valid file types in file input
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Upload and Rotate
        </button>
      </form>

      {originalImageUrl && rotatedImageUrl && (
        <div className="flex space-x-4">
          <div>
            <h3 className="text-lg font-semibold">Original Image</h3>
            <img src={originalImageUrl} alt="Original" className="w-64 h-64 object-contain" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Rotated Image</h3>
            <img src={rotatedImageUrl} alt="Rotated" className="w-64 h-64 object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
