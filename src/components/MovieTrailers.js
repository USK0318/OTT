import React, { useState, useEffect } from 'react';
import { fetchMovieVideos } from '../api/tmdb'; 

const MovieTrailers = ({ movieId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchMovieVideos(movieId);
        setVideos(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVideos();

    // Cleanup function to cancel any ongoing API requests if component unmounts
    return () => {
      // Add cleanup logic here if necessary
    };
  }, [movieId]); // Re-run effect when movieId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '24px', margin: '20px' }}>Movie Trailers</h2>
      <div className="trailers">
        {videos.map((video) => (
          <div key={video.key} className="trailer">
            <iframe
              title={video.name}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.key}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p>{video.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieTrailers;
