import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import MoviesPage from "./Pages/MoviePage"
import SongPage from "./Pages/SongPage"
import * as ReactBootStrap from "react-bootstrap";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import logo from '../../CSCE315PRoject3/src/images/logo.png'

function App() {
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
}
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

//  //MovieGlu API Testings
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
//  useEffect(() => {
//    fetch('/api/location/77375');
//  }, []);
return (
  <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
      <GlobalStyles/>
<div style= {{textAlign: 'center'}}>
  
      <Router >

        <ReactBootStrap.Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark">
        <ReactBootStrap.Navbar.Brand href=".">
          <img
            alt=""
            src={logo}//"https://i.scdn.co/image/ab67616d0000b273175715816616d0fb317fabeb"
            width="40"
            height="50"
            className="d-inline-block align-top"
          />{' '}
          Flicks 'n Picks
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto"> 
            <Link to="/MoviesPage">
              <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
                  Movie Page
              </ReactBootStrap.Nav.Link>
            </Link>
            <Link to="/SongPage">
              <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
                  Songs Page
              </ReactBootStrap.Nav.Link>
            </Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>

        <Route path="/MoviesPage" component={MoviesPage} />
        <Route path="/SongPage" component={SongPage} />

      </Router>
      <button onClick={themeToggler}>TURN THE FUCKIN LIGHTS OUT</button>
</div>
</>
    </ThemeProvider>


    );
}

export default App;


