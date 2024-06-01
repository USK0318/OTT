import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTVShowDetails } from '../api/tmdb'; // Import the function to fetch TV show details
import TVShowVideos from './TVShowVideos';

const TVShowDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchTVShowDetails(id); // Fetch TV show details
        setDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
        setLoading(false);
      }
    };

    getDetails();
        }, [id]);

     

  return (
    <div className="tv-show-details-container">
      {loading && <p>Loading...</p>}
      {!loading && details && (
        <div className="tv-show-details">
          <div className="poster">
            <img src={`https://image.tmdb.org/t/p/w300${details.poster_path}`} alt={details.name} />
          </div>
          <div className="details">
            <h1 className="title">{details.name}</h1>
            <p className="overview">{details.overview}</p>
            <div className="buttons">
              <Link to={`/tv-credits/${id}`} className="button"><button className="download-button">Credits</button></Link>
              <Link to={`/tv-reviews/${id}`} className="button"><button className="watch-button">Reviews</button></Link>
            </div>
            <TVShowVideos tvShowId={id} />
          </div>
        </div>
      )}
      {/* Add styling */}
      <style>{`
        .tv-show-details-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .tv-show-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f0f0f0;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          padding: 20px;
        }

        .poster img {
          max-width: 300px;
          border-radius: 8px;
        }

        .details {
          margin-top: 20px;
          text-align: center;
        }

        .title {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }

        .overview {
          font-size: 16px;
          color: #666;
          line-height: 1.5;
        }

        .buttons {
          margin-top: 20px;
        }

        .button {
          text-decoration: none;
        }

        .download-button,
        .watch-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          margin: 0 10px;
        }
      `}</style>
    </div>
  );
};

export default TVShowDetails;
