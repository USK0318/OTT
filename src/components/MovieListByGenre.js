import React, { useState, useEffect } from 'react';
import { fetchMoviesByGenre } from '../api/tmdb';   

const MovieListByGenre = ({ genreId }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchMoviesByGenre(genreId);
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();

    // Cleanup function to cancel any ongoing API requests if component unmounts
    return () => {
      // Add cleanup logic here if necessary
    };
  }, [genreId]); // Re-run effect when genreId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Movies by Genre</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieListByGenre;
