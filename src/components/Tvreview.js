import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define your BASE_URL and API_KEY here
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '71bef99e3aa17fa8fdd41c6dfcfa1f19';

const fetchTVShowReviews = async (id) => {
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

const TVShowReviews = ({ tvShowId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await fetchTVShowReviews(tvShowId);
        setReviews(fetchedReviews);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tvShowId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No reviews available</div>;
  }

  if (reviews.length === 0) {
    return <div style={{textAlign: 'center'}}>No reviews available</div>;
  }

  return (
    <div>
      <h2>TV Show Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TVShowReviews;
