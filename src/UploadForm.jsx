import React, { useState } from 'react';

const UploadForm = () => {
    const [posterFile, setPosterFile] = useState(null);
    const [guestListFile, setGuestListFile] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);

    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        setPosterFile(file);

        // Display image preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPosterPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleGuestListChange = (e) => {
        setGuestListFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('poster', posterFile);
        formData.append('invites', guestListFile);

        try {
            const response = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            window.location.href = '/posters';
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-3xl mb-4">Event Poster Generator</h1>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="poster" className="form-label">Upload Poster</label>
                            <input type="file" className="form-control" id="poster" onChange={handlePosterChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="guestList" className="form-label">Upload Guest List</label>
                            <input type="file" className="form-control" id="guestList" onChange={handleGuestListChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Upload</button>
                    </form>
                </div>
                <div className="col-md-4">
                    {posterPreview && (
                        <img src={posterPreview} alt="Poster Preview" className="img-fluid" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadForm;
