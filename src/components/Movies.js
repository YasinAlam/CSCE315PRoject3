import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostData from '../data/nowPlaying.json';
import TheaterData from '../data/theater.json';
 
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
          

            <p><input ref={this.setTextInputRef} type='text' placeholder='Movie'  name={this.props.inputMovie} onChange={this.handleChange}/></p>
            
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
            email: ''
        }
        this.inputLocationRef = React.createRef()
        this.inputMovieRef = React.createRef()

    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
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
            this.inputLocationRef.current.value = ''
            this.setState({
                location: ''
            })
            this.inputMovieRef.current.value = ''
            this.setState({
                movie: ''
            })
    }
    // componentDidMount(){

    // }
  render () {
      const {location} = this.state
      const {movie} = this.state
    return (
      <div>
        <Container>
            
            <Row>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#76b1c2", padding: "10px", marginBottom: "10px"}}>
                 <p>Selected Location: {location}</p>
                 <p>Selected Movie: {movie}</p>
                 <form onSubmit={this.handleSubmit}>
                    <MyInputBlock onChange={this.handleInputChange} inputLocation="location" inputMovie='movie'/>
                   
                    <p><button>Search</button></p>
                    <p><button onClick={this.handleClearClick}>Clear</button></p>
                 </form>
                 </div>
                 <div style= {{border: "5px solid", backgroundColor: "#7681c2", padding: "10px"}}>
                    <p>Selected movie Release Date: </p>
                    <p>Selected movie Runtime: </p>
                    <p>Selected movie Genre: </p>
                    <p>Selected movie Rating: </p>
                    <p>Selected movie Synopsis: </p>
                    <p>Movie ticket purchase link: </p>
                 </div>
                 
                </Col>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px"}}>
                    <h2>Local Theaters</h2>
                    {TheaterData.map((theaterDetail, index) => {
                        return <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                            <h3>{theaterDetail.name}</h3>
                            <p>Address: {theaterDetail.address}, {theaterDetail.city}, {theaterDetail.state}, {theaterDetail.zip_code} </p>
                            <p>Showtimes: {theaterDetail.showtime_day} at {theaterDetail.showtimes}</p>
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
