import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import topCharts from '../data/TopCharts.json';
import ConcertData from '../data/futureEvents.json';
import songData from '../data/allTracks.json';

class Songs extends Component {
    constructor(props){
        super(props)
        this.state = {
            myFullName: '',
            myContent: '',
            submitted: false
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
//        this.setState({
//            hidden:false
//        });
        console.log("Final data is", data)
        var x = document.getElementById("allTracks");
//        if (x.style.display === "none") {
        x.style.display = "block";
//        } else {
//          x.style.display = "none";
//        }
         this.setState({submitted: true});
    }

    handleInputChange = (event) => {
        event.preventDefault()
       // console.log(event)
       // console.log(event.target.name)
       // console.log(event.target.value)
       this.setState({
           [event.target.name]: event.target.value
       })
       if(this.state.submitted === false){
           var x = document.getElementById("allTracks");
           x.style.display = "none";
       }
       else{
           var x = document.getElementById("allTracks");
           x.style.display = "block";
       }

       console.log(this.state.submitted)
    }

    handleFocusClick = (event) => {
        event.preventDefault()
            this.inputEmailRef.current.focus()
    }
    handleClearClick = (event) => {
        event.preventDefault()
            //Clear from top text area
            this.setState({
                myFullName: '',
                hidden: true
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
            var x = document.getElementById("allTracks");
            x.style.display = "none";
    }
     componentDidMount(){
         var x = document.getElementById("allTracks");
            x.style.display = "none";
     }

  render () {
      const {myFullName} = this.state

    return (
      <div>
        <Container>
            <Row>
                <Col>
                <div style= {{border: "5px solid", backgroundColor: "#76b1c241", padding: "10px", marginBottom: "10px"}}>
                 <p>Selected Artist: {myFullName}</p>
                 <form onSubmit= {(e) => {this.handleSubmit(e)}}>
                    <input type='text' name = 'myFullName' onChange= {(e) => {this.handleInputChange(e)}}/>
                 </form>
                 <p><button onClick = {(e) => {this.handleSubmit(e)}}>Search</button></p>
                <p><button onClick= {(e) => {this.handleClearClick(e)}}>Clear</button></p>

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
                    {topCharts.map((topChartsDetail, index) => {
                        return <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                            <h3>{topChartsDetail.songName}</h3>
                            <img src= {topChartsDetail.albumImage} height = {270} width = {270}/>
                            <p>Artist: {topChartsDetail.artistName}</p>
                            <p>Popularity: {topChartsDetail.songPopularity}</p>
                            <p>Album: {topChartsDetail.albumName}</p>
                        </div>
                    })}
                    </div>
                </Col>
            </Row>
            <Row id ="allTracks">
                <Col>
                    <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                    <h2>Top Songs of the Month: </h2>
                    {songData.map((songDetail, index) => {
                        return <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
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