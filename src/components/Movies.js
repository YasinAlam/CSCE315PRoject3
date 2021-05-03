import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostData from '../data/nowPlaying.json';
import TheaterData from '../data/nearbyCinemas.json';
import thirdTitle from '../data/thirdTitle.json';


class MyInputBlock extends Component {
    constructor(props){
        super(props)
        this.textInput = null
        this.setTextInputRef = element => {
            this.textInput = element
        }
        this.focusTextInput = () => {
            if (this.textInput) this.textInput.focus()
        }

    }

    handleChange = (event) =>{
         if (this.props.onChange) this.props.onChange(event)
    }
    componentDidMount(){
        this.focusTextInput()
    }

    render() {
        return (
            <div>
          <p><input ref={this.setTextInputRef} type='text' placeholder='Zip Code'  name={this.props.inputLocation} onChange={this.handleChange}/></p>


            <p><input ref={this.setTextInputRef} type='text' placeholder='All Movies'  name={this.props.inputMovie} onChange={this.handleChange}/></p>

            </div>
      )
    }
}

class Movies extends Component {

    constructor(props){
        super(props)
        this.state = {
            location: '',
            movie: '',
            email: '',
            thirdTitle: thirdTitle.nameTwo
        }
        this.inputLocationRef = React.createRef()
        this.inputMovieRef = React.createRef()

    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state

        //Create variables for Latitude and Longitude
        var lat, long;

        //Get Nearby theaters and update Movies Playing right now
        if(data.movie === ''){
            let request = '/api/location/' + data.location
            fetch(request)
                .then(res => res.json())
                .then(data => {lat = data.latitude; long = data.longitude})
                .then(() => {console.log(lat);
                             console.log(long);
                             let location = "/api/movieglu/updateLocation/" + lat + "/" + long;
                             fetch(location).then(() => {
                                 fetch('/api/movieglu/nowplaying');
                                 fetch('/api/movieglu/cinemas/2021-04-25');
                                 })
                             })
            console.log("All Movies")
        }
        //Get nearby theaters and specific Movies Playing right now
        else{
        let request = '/api/movieglu/selectMovie/' + data.movie
        fetch(request);
        console.log(data.movie)
        var mydata = JSON.parse(data);
        }
        console.log("Final data is", data)
        this.setState({thirdTitle: "Selected Movie:"});

    }

    handleInputChange = (event) => {
        event.preventDefault()
       // console.log(event)
       // console.log(event.target.name)
       // console.log(event.target.value)
       this.setState({
           [event.target.name]: event.target.value
       })
    }

    handleFocusClick = (event) => {
        event.preventDefault()
            this.inputEmailRef.current.focus()
    }
    handleClearClick = (event) => {
        event.preventDefault()
            //Clear from top text area
            this.setState({
                location: ''
            })
            this.setState({
                movie: ''
            })

            //Clear from text fields
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            this.setState({
                itemvalues: [{}]
            });

            const data = this.state
            console.log("Final data is", data)

            //Create variables for Latitude and Longitude
            var lat, long;

            let request = '/api/location/' + 77840
            fetch(request)
                .then(res => res.json())
                .then(data => {lat = data.latitude; long = data.longitude})
                .then(() => {console.log(lat);
                             console.log(long);
                             let location = "/api/movieglu/updateLocation/" + lat + "/" + long;
                             fetch(location).then(() => {
                                 fetch('/api/movieglu/nowplaying');
                                 fetch('/api/movieglu/cinemas/2021-04-25');
                                 })
                             })
            this.setState({thirdTitle: "Now Playing:"});
    }
    // componentDidMount(){

    // }
  render () {
      const {location} = this.state
      const {movie} = this.state
      const {thirdTitle} = this.state
    return (
      <div>
        <Container>

            <Row>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#76b1c241", padding: "10px", marginBottom: "10px"}}>
                 <p>Selected Location: {location}</p>
                 <p>Selected Movie: {movie}</p>
                 <form onSubmit={this.handleSubmit}>
                    <MyInputBlock onChange={this.handleInputChange} inputLocation="location" inputMovie='movie' />

                    <p><button>Search</button></p>
                    <p><button onClick={this.handleClearClick}>Clear</button></p>
                 </form>
                 </div>
                <div style= {{border: "5px solid", backgroundColor: "#7681c241", padding: "10px"}}>
                    <h2>Instructions: </h2>
                    <h6>Start by entering your Zip Code and hitting search. Then choose from the list of movies on the
                    right and search for that movie to see timings.</h6>
                    <h6>Hit clear to reset app</h6>
                </div>
                </Col>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px"}}>
                    <h2>Local Theaters</h2>
                    {TheaterData.map((theaterDetail, index) => {
                        return <div id = "theaters" style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                            <h3>{theaterDetail.cinemaNames}</h3>
                             <img src= {theaterDetail.cinemaLogos} height = {100} width = {100}/>
                            <p>Address: {theaterDetail.cinemaAddresses}, {theaterDetail.cinemaCities}, {theaterDetail.cinemaStates}</p>
                            <p>Distance: {theaterDetail.cinemaDistances} Miles</p>
                            {theaterDetail.showTimes.map(x => createButtons(x,theaterDetail.cinemaIDs,theaterDetail.filmID))}

                        </div>
                    })}
                </div>
                </Col>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#7a61a241", padding: "10px"}}>
                    <h2>{thirdTitle}</h2>
                    {PostData.map((postDetail, index) => {
                        return <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                            <h3>{postDetail.filmName}</h3>
                            <img src= {postDetail.movieImage} height = {320} width = {270}/>
                            <p>Release Date: {postDetail.releaseDate}</p>
                            <p>Runtime: {postDetail.movieRuntime} Minutes</p>
                            <p>Genre: {postDetail.movieGenre}</p>
                            <p>Rating: {postDetail.movieRating}</p>
                            <p>Synopsis: {postDetail.filmSynop}</p>
                        </div>
                    })}
                    </div>
                </Col>
            </Row>

</Container>
        {/* <Container>
            <Row>
                <Col>

                </Col>
            </Row>
        </Container> */}
      </div>
    )
  }
}
//    function a(showTimes) {
//        let str = '' ;
//        for (let i in showTimes){
//            str += showTimes[i]+ ', ';
//        }
//
//        str = str.replace(/,\s*$/, "");
//        return (<p>Timings: {str}</p>)
//    }

function createButtons(data,cinemaID,filmID) {
    if(data !== "Please choose a movie to see timings" && data !== "No timings found"){
        return (
        <button onClick={() => getPurchaseLink(data,cinemaID,filmID)}>
                {data}
        </button>
    );}
    else{
        return(
        <button onClick={() => console.log('hello')}>
            {data}
        </button>
        );}
}

function getPurchaseLink(data,cinemaID,filmID){
    let request = '/api/movieglu/films/purchase/' + data + '/' + cinemaID + '/' + filmID
    var link;
    fetch(request)
        .then(res => res.json())
        .then(data => {link = data.URL;})
        .then(() => {return window.open(link, "_blank");
                     })
}

export default Movies
