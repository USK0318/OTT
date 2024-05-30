// src/api/tmdb.js
import axios from 'axios';

const API_KEY = '71bef99e3aa17fa8fdd41c6dfcfa1f19';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return response.data;
};


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


export const fetchMovieCredits = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};
//###########################################################################

export const fetchSimilarMovies = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};

