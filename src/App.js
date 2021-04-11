import React, { Component } from 'react'
// import PostSorting from './posts/PostSorting'
import './App.css'

import Movies from './components/Movies'
import Songs from './components/Songs'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Movies />
        <Songs />
      </div>
    )
  }
}

export default App
