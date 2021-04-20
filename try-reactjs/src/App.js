import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies'
import Songs from './components/Songs'

function App() {
//  //Bandsintown API Testing
//  useEffect(() => {
//    fetch('/api/bandsintown/5 seconds of summer/events/future');
//  }, []);
//  useEffect(() => {
//    fetch('/api/bandsintown/5 seconds of summer/events/past');
//  }, []);
//  useEffect(() => {
//    fetch('/api/bandsintown/5 seconds of summer');
//  }, []);
//
//  //Spotify API Testing
//  useEffect(() => {
//    fetch('/api/spotify/search/Drake');
//  }, []);
//  useEffect(() => {
//    fetch('/api/spotify/artists/3TVXtAsR1Inumwj472S9r4');
//  }, []);

//  //MovieGlu API Testing
//  useEffect(() => {
//    fetch('/api/movieglu/nowplaying');
//  }, []);
//  useEffect(() => {
//    fetch('/api/movieglu/cinemas/2021-04-19');
//  }, []);
//  useEffect(() => {
//    fetch('/api/movieglu/films/purchase/23/23/23/23');
//  }, []);
  useEffect(() => {
    fetch('/api/movieglu/updateLocation/3/2');
  }, []);

//    //Location API Testing
//  useEffect(() => {
//    fetch('/api/location/77375');
//  }, []);
return (
      <div className='App'>
        <Movies />
        <p>The current time is {3}.</p>
        <Songs />
      </div>
    );
}

export default App;


