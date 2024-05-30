import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { title, overview, poster_path, release_date } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="movie-card">
    <Link to={`/movies/${movie.id}`}>
    <div style={styles.card}>
      <img src={posterUrl} alt={`${title} poster`} style={styles.poster} />
      <div style={styles.details}>
        <h2>{title}</h2>
        <p><strong>Release Date:</strong> {release_date}</p>
        <p>{overview}</p>
      </div>
    </div>
    </Link>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
    backgroundColor: '#fff',
  },
  poster: {
    width: '150px',
    height: 'auto',
    borderRadius: '8px',
    marginRight: '16px',
  },
  details: {
    flex: 1,
  },
};

export default MovieCard;
