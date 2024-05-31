import React, { useEffect, useState } from 'react';
import { fetchMovieReviews, fetchMovieDetails } from '../api/tmdb';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
        setError(error);
        setLoading(false);
      }
    };

    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    getReviews();
    getMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error fetching reviews: {error.message}</p>;

  return (
    <div className="movie-reviews">
      {movieDetails && (
        <div className="movie-details">
          <h2>{movieDetails.title}</h2>
          <p>{movieDetails.overview}</p>
        </div>
      )}
      <h2>Movie Reviews</h2>
      <div className="review-cards">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="reviewer-avatar">
                {review.author_details.avatar_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${review.author_details.avatar_path}`}
                    alt={review.author}
                  />
                ) : (
                  <div className="placeholder-avatar" />
                )}
              </div>
              <div className="review-meta">
                <h3>{review.author}</h3>
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="review-content">
              <p>{review.content}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .movie-reviews {
          margin-top: 30px;
          padding: 0 20px;
        }

        .movie-details {
          text-align: center;
          margin-bottom: 20px;
        }

        .movie-details h2 {
          font-size: 28px;
          color: #333;
          margin-bottom: 10px;
        }

        .movie-details p {
          font-size: 16px;
          color: #555;
        }

        .movie-reviews h2 {
          font-size: 24px;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        .review-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .review-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .review-header {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }

        .reviewer-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 15px;
        }

        .reviewer-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder-avatar {
          width: 100%;
          height: 100%;
          background-color: #ccc;
        }

        .review-meta {
          flex-grow: 1;
        }

        .review-meta h3 {
          font-size: 18px;
          color: #333;
        }

        .review-meta span {
          font-size: 14px;
          color: #666;
        }

        .review-content {
          padding: 20px;
        }

        .review-content p {
          font-size: 16px;
          color: #555;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default MovieReviews;
