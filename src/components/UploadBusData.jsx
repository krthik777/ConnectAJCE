// components/UploadBusData.jsx
import React, { useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

const UploadBusData = () => {
  const [file, setFile] = useState(null);
  const [binIdInput, setBinIdInput] = useState(localStorage.getItem('jsonBinId') || '');
  const navigate = useNavigate();

  const API_KEY = '$2a$10$eyU92iI4Y9sDxFbxhxmdRecULv6HiZygpurEbxuXHWDjrbh4u9Afq';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBinIdChange = (e) => {
    setBinIdInput(e.target.value);
  };

  const uploadToJSONBin = async (data) => {
    const BIN_ID = binIdInput.trim();
    if (!BIN_ID) {
      throw new Error('Bin ID is required');
    }
    localStorage.setItem('jsonBinId', BIN_ID);

    const url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify({ data })
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
  };

  const handleUpload = () => {
    if (!file || !binIdInput.trim()) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          await uploadToJSONBin(results.data);
          navigate('/bus-timings');
        } catch (error) {
          console.error('Upload failed:', error);
          alert(error.message);
        }
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Bus CSV Data</h2>

      <label className="block mb-2 text-sm font-medium text-gray-700">
        JSONBin Bin ID
      </label>
      <input
        type="text"
        value={binIdInput}
        onChange={handleBinIdChange}
        placeholder="Enter your JSONBin Bin ID"
        className="w-full p-2 mb-4 border rounded-lg"
      />

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || !binIdInput.trim()}
        className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
      >
        <Upload className="w-5 h-5 mr-2" />
        Upload & Overwrite
      </button>
    </div>
  );
};

export default UploadBusData;
