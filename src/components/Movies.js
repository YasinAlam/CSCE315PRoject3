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
            thirdTitle: thirdTitle.trailer
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
            fetch('/api/movieglu/nowplaying');
            fetch('/api/movieglu/cinemas/2021-04-25');
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

                </Col>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px"}}>
                    <h2>Local Theaters</h2>
                    {TheaterData.map((theaterDetail, index) => {
                        return <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                            <h3>{theaterDetail.cinemaNames}</h3>
                             <img src= {theaterDetail.cinemaLogos} height = {100} width = {100}/>
                            <p>Address: {theaterDetail.cinemaAddresses}, {theaterDetail.cinemaCities}, {theaterDetail.cinemaStates}</p>
                            <p>Distance: {theaterDetail.cinemaDistances} Miles</p>
                            <p>Timings: {theaterDetail.showTimes}</p>

                        </div>
                    })}
                </div>
                </Col>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#7a61a241", padding: "10px"}}>
                    <h2>Movies Playing Right Now: </h2>
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

export default Movies
