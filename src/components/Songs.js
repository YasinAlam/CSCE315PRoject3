import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import SongData from '../data/TopCharts.json';
import ConcertData from '../data/futureEvents.json';
 
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
          <p><input ref={this.setTextInputRef} type='text' placeholder='Song'  name={this.props.inputFullName} onChange={this.handleChange}/></p>
          
          </div>
      )
    }
}

class Songs extends Component {
    constructor(props){
        super(props)
        this.state = {
            myFullName: '',
            myContent: '',
            email: ''
        }
        this.inputFullNameRef = React.createRef()
        this.inputEmailRef = React.createRef()
        fetch('/api/spotify/topresults')
//        fetch('/api/bandsintown/reset');
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        let request = '/api/bandsintown/' + data.myFullName + '/events/future'
        fetch(request);
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
            //Clear from top text area
            this.setState({
                myFullName: ''
            })

            //Clear from text fields
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            this.setState({
                itemvalues: [{}]
            });

            fetch('/api/bandsintown/reset');
            const data = this.state
            console.log("Final data is", data)
    }
    // componentDidMount(){
    //     this.inputFullNameRef.current.focus()
    // }
  render () {
      const {myFullName} = this.state
    return (
      <div>
        <Container>
            <Row>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#76b1c241", padding: "10px", marginBottom: "10px"}}>
                 <p>Selected Song: {myFullName}</p>
                 <form onSubmit={this.handleSubmit}>
                    <MyInputBlock onChange={this.handleInputChange} inputFullName="myFullName" inputContentName='myContent'/>

                    <p><button>Search</button></p>
                    <p><button onClick={this.handleClearClick}>Clear</button></p>
                 </form>
                 
                 </div>
                <div style= {{border: "5px solid", backgroundColor: "#7681c241", padding: "10px"}}>
                    <p>Selected song Release Date: </p>
                    <p>Selected song Artist: </p>
                    <p>Selected song Monthly Listeners: </p>
                    <p>Selected song Length: </p>
                    <p>Selected song Genre: </p>
                </div>
                </Col>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px"}}>
                    <h2>Local Concerts</h2>
                    {ConcertData.map((concertDetail, index) => {
                        return <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                            <h3>{concertDetail.venueArrayFuture}</h3>
                            <p>Location: {concertDetail.cityArrayFuture}</p>
                            <p>Date: {concertDetail.dateArrayFuture}</p>
                            <a href={concertDetail.ticketURLFuture} target="_blank">Purchase Tickets</a>
                        </div>
                    })}
                </div>
                </Col>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                    <h2>Top Songs of the Month: </h2>
                    {SongData.map((songDetail, index) => {
                        return <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                            <h3>{songDetail.songName}</h3>
                            <img src= {songDetail.albumImage} height = {270} width = {270}/>
                            <p>Artist: {songDetail.artistName}</p>
                            <p>Popularity: {songDetail.songPopularity}</p>
                            <p>Album: {songDetail.albumName}</p>
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

export default Songs