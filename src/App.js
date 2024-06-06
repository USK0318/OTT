import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MovieDetails from './components/MovieDetails';
import Movies from './components/Movies';
import MovieCredits from './components/MovieCredits';
import { useParams } from 'react-router-dom';
import MovieReviews from './components/MovieReviews';
import TVShowDetails from './components/Tvdetals';
import TVShowCredits from './components/Tvcredits';
import TVShowReviews from './components/Tvreview';
import Home from './components/Home';
import PopularTVShows from './components/PopularTVShows';
import TrendingMovies from './components/TrendingMovies';
import UpcomingMovies from './components/UpcomingMovies';
import TopRatedMovies from './components/TopRatedMovies';

function App() {
  return (
    <div className='final'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/popularmovies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/credits/:id' element={<MovieCreditsWrapper />} />
        <Route path='/reviews/:id' element={<MovieReviewsWrapper />} />
        <Route path='/tv-shows/:id' element={<TVShowDetails />} />
        <Route path='/tv-credits/:id' element={<TVShowCreditsWrapper />} />
        <Route path='/tv-reviews/:id' element={<TVShowReviewsWrapper />} />
        <Route path='/populartvshows' element={<PopularTVShows />} />
        <Route path='/trendingmovies' element={<TrendingMovies />} />
        <Route path='/upcomingmovies' element={<UpcomingMovies />} />
        <Route path='/topratedmovies' element={ <TopRatedMovies />} />

      </Routes>
    </div>
  );
}

const MovieCreditsWrapper = () => {
  const { id } = useParams();
  return <MovieCredits movieId={id} />;
};

const MovieReviewsWrapper = () => {
  const { id } = useParams();
  return <MovieReviews movieId={id} />;
};

const TVShowCreditsWrapper = () => {
  const { id } = useParams();
  return <TVShowCredits tvShowId={id} />;
};

const TVShowReviewsWrapper = () => {
  const { id } = useParams();
  return <TVShowReviews id={id} />;
};

export default App;
