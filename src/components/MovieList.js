import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default MovieList;
