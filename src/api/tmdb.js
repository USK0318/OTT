// src/api/tmdb.js
import axios from 'axios';

const API_KEY = '71bef99e3aa17fa8fdd41c6dfcfa1f198';
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch Popular Movies
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

// Fetch Movie Details
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Search Movies
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

// Fetch Movie Credits
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

// Fetch Similar Movies
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

// Fetch Movie Reviews
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

// Fetch Now Playing Movies
export const fetchNowPlayingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
};

// Fetch Top Rated Movies
export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

// Fetch Upcoming Movies
export const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

// Fetch Trending Movies
export const fetchTrendingMovies = async (time_window = 'day') => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/${time_window}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Fetch Person Details
export const fetchPersonDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/person/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching person details:', error);
    throw error;
  }
};

// Fetch Movies by Genre
export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

// Fetch Movie Videos (Trailers)
export const fetchMovieVideos = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
};




// Fetch Popular TV Shows
export const fetchPopularTVShows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    throw error;
  }
};

// Fetch TV Show Details
export const fetchTVShowDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};

// Search TV Shows
export const searchTVShows = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/tv`, {
      params: {
        api_key: API_KEY,
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching TV shows:', error);
    throw error;
  }
};

// Fetch TV Show Credits
export const fetchTVShowCredits = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching TV show credits:', error);
    throw error;
  }
};
// Fetch TV Show Videos (Trailers)
export const fetchTVShowVideos = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TV show videos:', error);
    throw error;
  }
};
// Fetch TV Show Reviews
export const fetchTVShowReviews = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}/reviews`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TV show reviews:', error);
    throw error;
  }
};

