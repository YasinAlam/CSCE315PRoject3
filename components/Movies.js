import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostData from '../data/movie.json';
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
                <div>
                 <p>Selected Location: {location}</p>
                 <p>Selected Movie: {movie}</p>
                 <form onSubmit={this.handleSubmit}>
                    <MyInputBlock onChange={this.handleInputChange} inputLocation="location" inputMovie='movie'/>
                   
                    <p><button>Search</button></p>
                    <p><button onClick={this.handleClearClick}>Clear</button></p>
                 </form>
                 
                 </div>
                 <p>Selected movie Release Date: </p>
                 <p>Selected movie Runtime: </p>
                 <p>Selected movie Genre: </p>
                 <p>Selected movie Rating: </p>
                 <p>Selected movie Synopsis: </p>
                 <p>Movie ticket purchase link: </p>
                </Col>
                <Col>
                <div>
                    <h2>Local Theaters</h2>
                    {TheaterData.map((theaterDetail, index) => {
                        return <div>
                            <h3>{theaterDetail.name}</h3>
                            <p>Address: {theaterDetail.address}, {theaterDetail.city}, {theaterDetail.state}, {theaterDetail.zip_code} </p>
                            <p>Showtimes: {theaterDetail.showtime_day} at {theaterDetail.showtimes}</p>
                        </div>
                    })}
                </div>
                </Col>
                <Col>
                <div>
                    <h2>Top Movies of the Month: </h2>
                    {PostData.map((postDetail, index) => {
                        return <div>
                            <h3>{postDetail.title}</h3>
                            <img src= {postDetail.poster} height = {320} width = {270}/>
                            <p>Release Date: {postDetail.release_date}</p>
                            <p>Runtime: {postDetail.runtime}</p>
                            <p>Genre: {postDetail.genre}</p>
                            <p>Rating: {postDetail.rating}</p>
                            <p>Synopsis: {postDetail.synopsis}</p>
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
