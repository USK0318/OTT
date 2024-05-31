import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define your BASE_URL and API_KEY here
const BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = '71bef99e3aa17fa8fdd41c6dfcfa1f19';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; // Base URL for fetching images

const fetchTVShowCredits = async (id) => {
  console.log('fetchTVShowCredits called with id:', id);
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

const TVShowCredits = ({ tvShowId }) => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTVShowCredits = async () => {
      try {
        const cast = await fetchTVShowCredits(tvShowId);
        setCredits(cast);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getTVShowCredits();
  }, [tvShowId]);

  const isMobile = window.innerWidth <= 600;

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error fetching TV show credits: {error.message}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>TV Show Credits</h2>
      <ul style={styles.list}>
        {credits.map((member) => (
          <li key={member.cast_id} style={isMobile ? styles.listItemMobile : styles.listItem}>
            {member.profile_path && (
              <img
                src={`${IMAGE_BASE_URL}${member.profile_path}`}
                alt={member.name}
                style={styles.profileImage}
              />
            )}
            <div>
              <span style={styles.actorName}>{member.name}</span> as <span style={styles.characterName}>{member.character}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  listItemMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  actorName: {
    fontWeight: 'bold',
  },
  characterName: {
    color: '#666',
  },
};

export default TVShowCredits;
