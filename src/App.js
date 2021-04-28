import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import MoviesPage from "./Pages/MoviePage"
import SongPage from "./Pages/SongPage"

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
  useEffect(() => {
    fetch('/api/spotify/topresults');
  }, []);

//  //MovieGlu API Testing
//  useEffect(() => {
//    fetch('/api/movieglu/nowplaying');
//  }, []);
//  useEffect(() => {
//    fetch('/api/movieglu/updateLocation/30.0739/-95.6201');
//  }, []);
//  useEffect(() => {
//    fetch('/api/movieglu/cinemas/2021-04-25');
//  }, []);
//  useEffect(() => {
//    fetch('/api/movieglu/films/purchase/23/23/23/23');
//  }, []);
//  useEffect(() => {
//    fetch('/api/movieglu/updateLocation/3/2');
//  }, []);

    //Location API Testing
  useEffect(() => {
    fetch('/api/location/77375');
  }, []);
return (
    <div style= {{textAlign: 'center', backgroundColor: "#61dafb"}}>
      <Router >

        <div className="container" style= {{textAlign: 'center'}}>
          <h1>Flicks N Picks</h1>
            <nav>
              <ul>
                <Link to="/MoviesPage" className="btn btn-primary">Movie Search</Link>
              </ul>
              <ul>
                <Link to="/SongPage" className="btn btn-primary">Song Search</Link>
              </ul>
            </nav>
        </div>
        <Route path="/MoviesPage" component={MoviesPage} />
        <Route path="/SongPage" component={SongPage} />

      </Router>
    </div>
    );
}

export default App;


