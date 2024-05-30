import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MovieDetails from './components/MovieDetails';
import Movies from './components/Movies';
import MovieCredits from './components/MovieCredits';
import { useParams } from 'react-router-dom';

function App() {
  return (
    <div className='final'>
      <Routes>
        <Route path='/' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/credits/:id' element={<MovieCreditsWrapper />} />
      </Routes>
    </div>
  );
}

const MovieCreditsWrapper = () => {
  const { id } = useParams();
  return <MovieCredits movieId={id} />;
};

export default App;
