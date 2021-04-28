import React from 'react';
import Movies from '../components/Movies';
import '../App.css'
//import './App.css'

export default function MoviesPage(){
    return(
        <div style= {{backgroundImage: "../images/bg.jpeg"}}>
            <Movies />
        </div>
    );
}