import React, { useState } from 'react';
import axios from 'axios';
import MovieList from './MovieList';

// Assuming BASE_URL and API_KEY are defined in your environment or constants file
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '71bef99e3aa17fa8fdd41c6dfcfa1f19';

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

const MovieSearchComponent = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setError('');
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MovieSearchComponent;
