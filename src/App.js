import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MovieDetails from './components/MovieDetails';
import Movies from './components/Movies';

function App() {
  return (
    <>
      <div className='final'>
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
