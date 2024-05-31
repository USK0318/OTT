import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/tmdb';
import SimilarMovies from './SimilarMovies';
import MovieTrailers from './MovieTrailers';

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    getDetails();
  }, [id]);

  return (
    <div className="movie-details-container">
      {loading && <p>Loading...</p>}
      {!loading && details && (
        <div className="movie-details">
          <div className="poster">
            <img src={`https://image.tmdb.org/t/p/w300${details.poster_path}`} alt={details.title} />
          </div>
          <div className="details">
            <h1 className="title">{details.title}</h1>
            <p className="overview">{details.overview}</p>
            <div className="buttons">
              <Link to={`/credits/${id}`}><button className="download-button">Credits</button></Link>
              <Link to={`/reviews/${id}`}><button className="watch-button">Reviews</button></Link>
            </div>
            
          </div>
          <MovieTrailers movieId={id} />
          <SimilarMovies movieId={id} />
        </div>
      )}
      <style>{`
        .movie-details-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
          padding: 0 20px;
        }

        .movie-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #f0f0f0; /* Changed background color */
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          max-width: 800px;
          width: 100%;
        }

        .poster {
          width: 100%;
          display: flex;
          justify-content: center; /* Align image center horizontally */
        }

        .poster img {
          max-width: 400px; /* Set max-width to limit image size */
          width: 100%; /* Set image width to 100% */
          height: auto;
          margin-top: 30px; /* Adjust margin-top to center image vertically */
          border-radius: 12px 12px 0 0;
        }

        .details {
          width: 100%;
          padding: 20px;
        }

        .title {
          font-size: 28px;
          color: #333333;
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 10px;
          text-align: center;
        }

        .overview {
          font-size: 18px;
          line-height: 1.6;
          color: #666666;
          font-family: 'Roboto', sans-serif;
          text-align: justify;
        }

        .buttons {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .download-button,
        .watch-button {
          width: 250px;
          height: 60px;
          margin: 0 10px;
          padding: 10px 20px;
          font-size: 18px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          background-color: #007bff;
          color: #ffffff;
        }

        .watch-button {
          background-color: #28a745;
        }

        .download-button:hover,
        .watch-button:hover {
          opacity: 0.8;
        }

        @media screen and (max-width: 600px) {
          .download-button,
          .watch-button {
            width: 150px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;
