import React, { useState, useEffect } from 'react';
import { fetchPopularTVShows } from '../api/tmdb'; // Adjust the path as needed
import { Link } from 'react-router-dom';

const PopularTVShows = () => {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVShowsData = async () => {
      try {
        const popularTVShows = await fetchPopularTVShows();
        setTVShows(popularTVShows);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTVShowsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Popular TV Shows</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        {tvShows.map((tvShow) => (
            <Link to={`/tv-shows/${tvShow.id}`} style={{ textDecoration: 'none', color: '#333' }}>
          <div key={tvShow.id} style={{ width: '300px', backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <img
              src={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`}
              alt={tvShow.name}
              style={{ width: '100%', height: 'auto', borderRadius: '8px 8px 0 0' }}
            />
            <div style={{ padding: '10px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '5px', lineHeight: '1.2' }}>{tvShow.name}</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.4', minHeight: '60px', maxHeight: '120px', overflow: 'hidden' }}>{tvShow.overview}</p>
            </div>
          </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTVShows;
