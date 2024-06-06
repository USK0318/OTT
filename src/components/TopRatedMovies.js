import React, { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../api/tmdb';
import { Link } from 'react-router-dom';

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const moviesData = await fetchTopRatedMovies();
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
        setError(error);
        setLoading(false);
      }
    };

    getTopRatedMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error fetching movies: {error.message}</p>;

  return (
    <div className="top-rated-movies">
      <h2>Top Rated Movies</h2>
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
              <p>Rating: {movie.vote_average}</p>
              <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        .top-rated-movies {
          margin-top: 30px;
          padding: 0 20px;
        }

        .top-rated-movies h2 {
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

export default TopRatedMovies;
