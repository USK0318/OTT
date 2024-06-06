import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../api/tmdb';
import { Link } from 'react-router-dom';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeWindow, setTimeWindow] = useState('day');

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const moviesData = await fetchTrendingMovies(timeWindow);
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setError(error);
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, [timeWindow]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error fetching movies: {error.message}</p>;

  return (
    <div className="trending-movies">
      <h2>Trending Movies</h2>
      <div className="time-window-buttons">
        <button onClick={() => setTimeWindow('day')} disabled={timeWindow === 'day'}>
          Today
        </button>
        <button onClick={() => setTimeWindow('week')} disabled={timeWindow === 'week'}>
          This Week
        </button>
      </div>
      <div className="movie-cards">.
      
        {movies.map((movie) => (
          
          <div key={movie.id} className="movie-card">
            <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
              <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            </Link>
          </div>

        ))}
      </div>
      <style jsx>{`
        .trending-movies {
          margin-top: 30px;
          padding: 0 20px;
        }

        .trending-movies h2 {
          font-size: 24px;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        .time-window-buttons {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .time-window-buttons button {
          margin: 0 10px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .time-window-buttons button:disabled {
          background-color: #aaa;
        }

        .movie-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .movie-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .movie-card img {
          width: 100%;
          height: auto;
        }

        .movie-info {
          padding: 15px;
        }

        .movie-info h3 {
          font-size: 18px;
          color: #333;
          margin: 0 0 10px;
        }

        .movie-info p {
          font-size: 14px;
          color: #666;
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default TrendingMovies;
