import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies'
import Songs from './components/Songs'

function App() {
  //Bandsintown API Testing
  useEffect(() => {
    fetch('/api/bandsintown/5 seconds of summer/events/future');
  }, []);
  useEffect(() => {
    fetch('/api/bandsintown/5 seconds of summer/events/past');
  }, []);
  useEffect(() => {
    fetch('/api/bandsintown/5 seconds of summer');
  }, []);

  //Spotify API Testing
  useEffect(() => {
    fetch('/api/spotify/search/Drake');
  }, []);
  useEffect(() => {
    fetch('/api/spotify/artists/3TVXtAsR1Inumwj472S9r4');
  }, []);

  //MovieGlu API Testing

return (
      <div className='App'>
        <Movies />
        <p>The current time is {3}.</p>
        <Songs />
      </div>
    );
}

export default App;


