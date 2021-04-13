import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies'
import Songs from './components/Songs'

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/bandsintown/5 seconds of summer/events/future').then(res => res.json()).then(data => {
      setCurrentTime(data.ticketDateArrayFuture);
    });
  }, []);

return (
      <div className='App'>
        <Movies />
        <p>The current time is {currentTime}.</p>
        <Songs />
      </div>
    );
}

export default App;


