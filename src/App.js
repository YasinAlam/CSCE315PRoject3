import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Route, BrowserRouter as Router, Link} from "react-router-dom";

import MoviesPage from "./Pages/MoviePage"
import SongPage from "./Pages/SongPage"

function App() {
    return (
      <Router>

        <div className="container">
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
    );
}


export default App
