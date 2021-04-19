import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies'
import Songs from './components/Songs'

function App() {
  //Music API Testing
  useEffect(() => {
    fetch('/api/bandsintown/5 seconds of summer/events/future');
  }, []);
  useEffect(() => {
    fetch('/api/bandsintown/5 seconds of summer/events/past');
  }, []);
  useEffect(() => {
    fetch('/api/bandsintown/5 seconds of summer');
  }, []);

  //Movie API Testing


return (
      <div className='App'>
        <Movies />
        <p>The current time is {3}.</p>
        <Songs />
      </div>
    );
}

export default App;


