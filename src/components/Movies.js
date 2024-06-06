import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPopularMovies } from '../api/tmdb';
import './Movies.css'; // Import the CSS file
// import Banners from './Banners';
// import MovieSearchComponent from './MovieSearchComponent';
// import NowPlayingMovies from './NowPlayingMovies';
// import TopRatedMovies from './TopRatedMovies';
// import UpcomingMovies from './UpcomingMovies';
// import TrendingMovies from './TrendingMovies';
// import PopularTVShows from './PopularTVShows';

const Movies = () => {
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

  if (loading) return <p className="loading">Loading...</p>; // Apply loading class
  if (error) return <p className="error">Error loading movies: {error.message}</p>; // Apply error class

  return (
    <div className="movies-container"> {/* Apply movies-container class */}
    {/* <Banners />
    <MovieSearchComponent /> */}
      <h1 style={{fontsize: '1.5rem', textAlign: 'center', padding: '1rem 0'}}>Popular Movies</h1>
      <div className="movies-grid"> {/* Apply movies-grid class */}
        {movies.map(movie => (
          <div key={movie.id} className="movie-item"> {/* Apply movie-item class */}
            <Link to={`/movies/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <div className="movie-details"> {/* Apply movie-details class */}
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* <NowPlayingMovies />
      <TopRatedMovies />
      <UpcomingMovies />
      <TrendingMovies />
      <PopularTVShows /> */}
    </div>
  );
};

export default Movies;
