import React, { useEffect, useState } from 'react';

const PosterGallery = () => {
    const [posters, setPosters] = useState([]);

    useEffect(() => {
        fetchPosters();
    }, []);

    const fetchPosters = async () => {
        try {
            const response = await fetch('http://localhost:8080/guests');
            if (response.ok) {
                const postersList = await response.json();
                setPosters(postersList);
            } else {
                console.error('Failed to fetch posters');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const downloadPoster = async (url, name) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = name;
        a.click();
        URL.revokeObjectURL(blobUrl);
    };

    return (
        <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 g-4">
                {posters.map((poster) => (
                    <div className="col" key={poster.id}>
                        <div className="card">
                            <img src={poster.url} className="card-img-top" alt={poster.name} />
                            <div className="card-body">
                                <p>{poster.name}</p>
                                <button
                                    className="btn btn-primary d-block mx-auto"
                                    onClick={() => downloadPoster(poster.url, poster.full)}
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PosterGallery;
