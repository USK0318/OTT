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
      <style>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
            font-family: 'Arial', sans-serif;
          }

          .title {
            color: white;
            font-size: 2em;
            margin-bottom: 20px;
            animation: fadeIn 1s ease-in;
          }

          .search-container {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }

          .search-input {
            width: 400px;
            height: 30px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1em;
            margin-right: 10px;
          }

          .search-button {
            padding: 10px 15px;
            height: 50px;
            width: 100px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
            font-size: 1em;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .search-button:hover {
            background-color: #0056b3;
          }

          .error-message {
            color: red;
            margin-top: 10px;
            animation: fadeIn 0.5s ease-in;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          /* Responsive Design */
          @media (max-width: 600px) {
            .search-container {
              flex-direction: column;
            }

            .search-input {
              width: 100%;
              margin-bottom: 10px;
            }

            .search-button {
              width: 100%;
            }
          }
        `}
      </style>
      <div className="container">
        <h1 className="title">Movie Search</h1>
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default MovieSearchComponent;
