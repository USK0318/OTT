import React, { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from '../api/tmdb';
import { Link } from 'react-router-dom';

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const moviesData = await fetchUpcomingMovies();
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        setError(error);
        setLoading(false);
      }
    };

    getUpcomingMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error fetching movies: {error.message}</p>;

  return (
    <div className="upcoming-movies">
      <h2>Upcoming Movies</h2>
      <div className="movie-cards">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        .upcoming-movies {
          margin-top: 30px;
          padding: 0 20px;
        }

        .upcoming-movies h2 {
          font-size: 24px;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
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

export default UpcomingMovies;
