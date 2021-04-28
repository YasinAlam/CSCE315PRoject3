import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import MoviesPage from "./Pages/MoviePage"
import SongPage from "./Pages/SongPage"
import * as ReactBootStrap from "react-bootstrap";
import bg from './images/bg.jpeg'

function App() {

  useEffect(() => {
    fetch('/api/location/77375');
  }, []);
return (
<div  styles={{ backgroundColor:"blue" }}>
      <Router>

        <ReactBootStrap.Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark">
  <ReactBootStrap.Navbar.Brand href="#home">FLICKS N PICKS</ReactBootStrap.Navbar.Brand>
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
      <div>
            <h>hello</h>
      </div>
      </div>



    );
}

export default App;


