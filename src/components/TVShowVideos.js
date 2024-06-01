import React, { useState, useEffect } from 'react';
import { fetchTVShowVideos } from '../api/tmdb'; // Adjust the path as needed

const TVShowVideos = ({ tvShowId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await fetchTVShowVideos(tvShowId);
        setVideos(fetchedVideos);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [tvShowId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching TV show videos: {error.message}</div>;
  }

  if (videos.length === 0) {
    return <div>No videos available</div>;
  }

  return (
    <div>
      <h2>TV Show Videos</h2>
      <div className="video-list">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <h3>{video.name}</h3>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVShowVideos;
