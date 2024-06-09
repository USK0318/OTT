import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import MovieSearchComponent from './MovieSearchComponent';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="logo">U$K - Movies</div>
          <div className="nav-container">
          </div>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1 style={{color:'white'}}>Watch movies, TV shows and more</h1>
          <p style={{color:'white'}}>Watch anywhere. Cancel anytime.</p>
          <p style={{color:'white'}}>Ready to watch? Enter your email to create or restart your membership.</p>
          <div className="email-form">
            <input type="email" placeholder="Email address" />
            <button className="cta-btn">Get Started</button>
          </div>
        </div>
      </section>
      <div style={{marginTop:'60px'}}>
      <MovieSearchComponent /> 
      </div>
      <div className="card-container">
        <Link to={'/popularmovies'}>
          <div className="card card1">
            <h3>Popular Movies</h3>
            <p>Explore the most popular movies trending right now.</p>
          </div>
        </Link>
        <Link to={'/populartvshows'}>
          <div className="card card2">
            <h3>Popular TV Shows</h3>
            <p>Discover the top TV shows that everyone's talking about.</p>
          </div>
        </Link>
        <Link to={'/trendingmovies'}>
          <div className="card card3">
            <h3>Trending Movies</h3>
            <p>Stay updated with the latest movies trending this week.</p>
          </div>
        </Link>
        <Link to={'/upcomingmovies'}>
          <div className="card card4">
            <h3>Upcoming Movies</h3>
            <p>Get a sneak peek at movies coming soon to theaters and streaming.</p>
          </div>
        </Link>
        <Link to={'/topratedmovies'}>
          <div className="card card5">
            <h3>Top Rated Movies</h3>
            <p>Check out the highest-rated movies of all time, as voted by users.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
