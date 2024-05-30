import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const SimilarMovies = ({ movieId }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar`, {
          params: {
            api_key: '71bef99e3aa17fa8fdd41c6dfcfa1f19',
          },
        });
        setSimilarMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching similar movies: {error.message}</p>;

  return (
    <div className="similar-movies-container">
      <h2 className="similar-movies-title">Similar Movies</h2>
      <div className="similar-movies">
        {similarMovies.map((movie) => (
          <div key={movie.id} className="similar-movie">
            <Link to={`/movies/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="rating">Rating: {renderStarRating(movie.vote_average)}</p>
                <p className="overview">{movie.overview}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        .similar-movies-container {
          margin-top: 30px;
          padding: 0 20px;
        }

        .similar-movies-title {
          font-size: 24px;
          color: #333;
          text-align: center;
        }

        .similar-movies {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0 -10px; /* Adjust for negative margins */
        }

        .similar-movie {
          flex: 0 0 calc(50% - 20px); /* Two movies per line */
          margin: 0 10px 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          transition: transform 0.3s;
          overflow: hidden;
          max-width: 400px; /* Adjust the maximum width */
        }

        .similar-movie:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .similar-movie img {
          width: 100%;
          height: auto;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .movie-info {
          padding: 20px;
        }

        .movie-title {
          font-size: 20px;
          color: #333;
          margin-bottom: 10px;
        }

        .rating {
          display: flex;
          align-items: center;
          color: #f1c40f;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .rating svg {
          fill: #f1c40f;
          margin-right: 5px;
        }

        .overview {
          font-size: 16px;
          color: #777;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .similar-movie {
            flex-basis: calc(50% - 20px);
          }
        }

        @media (max-width: 480px) {
          .similar-movie {
            flex-basis: calc(100% - 20px);
          }
        }
      `}</style>
    </div>
  );
};

const renderStarRating = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.round(rating / 2)) {
      stars.push(<AiFillStar key={i} />);
    } else {
      stars.push(<AiFillStar key={i} style={{ opacity: 0.3 }} />);
    }
  }
  return stars;
};

export default SimilarMovies;
