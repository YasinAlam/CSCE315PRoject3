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
          <p><input ref={this.setTextInputRef} type='text' placeholder='Movie'  name={this.props.inputFullName} onChange={this.handleChange}/></p>
          
          </div>
      )
    }
}

class Movies extends Component {
    constructor(props){
        super(props)
        this.state = {
            myFullName: '',
            myContent: '',
            email: ''
        }
        this.inputFullNameRef = React.createRef()
        this.inputEmailRef = React.createRef()
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        // console.log(this.inputFullNameRef.current.value)
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
            this.inputFullNameRef.current.value = ''
            this.setState({
                myFullName: ''
            })
    }
    // componentDidMount(){
    //     this.inputFullNameRef.current.focus()
    // }
  render () {
      const {myFullName} = this.state
    return (
      <div>
        <h1>Flicks and Picks</h1>
        <Container>
            <Row>
                <Col>
                <div>
                <h1>Top Movies of the Month: </h1>
                {PostData.map((postDetail, index) => {
                    return <div>
                        <h2>{postDetail.title}</h2>
                        <p>Release Date: {postDetail.release_date}</p>
                        <p>Runtime: {postDetail.runtime}</p>
                        <p>Genre: {postDetail.genre}</p>
                        <p>Rating: {postDetail.rating}</p>
                        <p>Synopsis: {postDetail.synopsis}</p>
                    </div>
                })}
                </div>
                </Col>
                <Col>
                <div>
                    <h1>Local Theaters</h1>
                    {TheaterData.map((theaterDetail, index) => {
                        return <div>
                            <h2>{theaterDetail.name}</h2>
                            <p>Address: {theaterDetail.address}, {theaterDetail.city}, {theaterDetail.state}, {theaterDetail.zip_code} </p>
                            <p>Showtimes: {theaterDetail.showtime_day} at {theaterDetail.showtimes}</p>
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
        
        
        <p>Selected Movie: {myFullName}</p>
        <form onSubmit={this.handleSubmit}>
            <MyInputBlock onChange={this.handleInputChange} inputFullName="myFullName" inputContentName='myContent'/>
        
          <p><button>Search</button></p>
          <p><button onClick={this.handleClearClick}>Clear</button></p>
          <p><button>Search For Song</button></p>
        </form>
      </div>
    )
  }
}

export default Movies
