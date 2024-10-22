import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const VisitionCardUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        companyName: '',
        email: '',
        phone: '',
        address: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file drop in the drag-and-drop zone
    const onDrop = async (acceptedFiles) => {
        try {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));

            const response = await axios.post('http://localhost:8080/api/user/upload', { file: selectedFile }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFormData(response.data.response);
            console.log(response.data.response);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*, application/pdf',
        multiple: false,
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        console.log('Uploaded File:', file);
    };


    const handleButtonClick = () => {
        navigate('/cards');
    };
    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            {/* <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}> */}
            <h2>Custom Form</h2>

            {/* Name Field */}
            <div className='row' style={{ marginBottom: '10px' }}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    // onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />
            </div>

            {/* Job Title Field */}
            <div className='row' style={{ marginBottom: '10px' }}>
                <label>Job Title:</label>
                <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    // onChange={handleChange}
                    placeholder="Enter your job title"
                    required
                />
            </div>

            {/* Company Name Field */}
            <div className='row' style={{ marginBottom: '10px' }}>
                <label>Company Name:</label>
                <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    // onChange={handleChange}
                    placeholder="Enter your company name"
                    required
                />
            </div>

            {/* Email Field */}
            <div className='row' style={{ marginBottom: '10px' }}>
                <label>Email Address:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    // onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
            </div>

            {/* Phone Number Field */}
            <div className='row' style={{ marginBottom: '10px' }}>
                <label>Phone Number:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    // onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                />
            </div>

            {/* Address Field */}
            <div className='row' style={{ marginBottom: '10px' }}>
                <label>Address:</label>
                <textarea
                    name="address"
                    value={formData.address}
                    // onChange={handleChange}
                    placeholder="Enter your address"
                    rows="3"
                    required
                />
            </div>

            {/* Drag-and-Drop File Upload */}
            <div className='row'
                {...getRootProps()}
                style={{
                    border: '2px dashed #888',
                    borderRadius: '10px',
                    padding: '30px',
                    textAlign: 'center',
                    backgroundColor: isDragActive ? '#d3f9d8' : '#fafafa',
                    cursor: 'pointer',
                    marginBottom: '10px',
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the file here...</p>
                ) : (
                    <p>Drag and drop a file here, or click to select one</p>
                )}
            </div>

            {/* File Preview */}
            {preview && (
                <div style={{ marginTop: '10px' }}>
                    <h4>Preview:</h4>
                    {file && file.type.startsWith('image/') ? (
                        <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '200px' }} />
                    ) : (
                        <p>{file.name}</p>
                    )}
                </div>
            )}

            {/* Submit Button */}
            <button
                // type="submit"
                onClick={() => handleButtonClick()}
                style={{
                    marginTop: '15px',
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                All Cards
            </button>
            {/* </form> */}
        </div>
    )
}
