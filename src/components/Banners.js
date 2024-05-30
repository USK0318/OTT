import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../api/tmdb';

const Banners = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchPopularMovies();
        setMovies(movies);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error.message}</p>;

  return (
    <div className="banner-container">
      <h1>Recent Movie</h1>
      <div className="banner-scroll">
        {movies.map(movie => (
          <div key={movie.id} className="banner-item">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div className="banner-info">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
          .banner-container {
            padding: 20px;
            font-family: Arial, sans-serif;
          }

          .banner-scroll {
            display: flex;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding-bottom: 20px;
          }

          .banner-item {
            flex: 0 0 auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%; /* Adjusted to take full width */
            max-width: 650px; /* Max width for card */
            margin-right: 20px; /* Spacing between items */
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
            background-color: #fff;
          }

          .banner-item:hover {
            transform: scale(1.05);
          }

          .banner-info {
            padding: 20px;
            flex-grow: 1;
          }

          .banner-info h2 {
            font-size: 23px; /* Adjust the title font size */
            margin-bottom: 10px;
            color: #333;
          }

          .banner-info p {
            font-size: 17px; /* Adjust the overview font size */
            color: #666;
            margin: 0;
          }

          .banner-item img {
            width: 30%; /* Adjust the image width */
            height: auto;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
          }

          @media (max-width: 768px) {
            .banner-item {
              max-width: 100%; /* Adjusted to take full width */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Banners;
