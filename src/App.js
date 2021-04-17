import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {Route, BrowserRouter as Router, Link} from "react-router-dom";

import Movies from './components/Movies'
import Songs from './components/Songs'
import ClassClick from './components/ClassClick'
import MoviesPage from "./Pages/MoviePage"
import SongPage from "./Pages/SongPage"

function App() {
    return (
      <Router>

        <div className="container">
          <h1>Flicks N Picks</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/MoviesPage">MoviesPage</Link>
                </li>
                <li>
                  <Link to="/SongPage">SongPage</Link>
                </li>
              </ul>
            </nav>
        </div>
        <Route path="/MoviesPage" component={MoviesPage} />
        <Route path="/SongPage" component={SongPage} />

      </Router>
    );
}


export default App
