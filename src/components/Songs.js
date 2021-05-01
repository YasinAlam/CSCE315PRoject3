import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import topCharts from '../data/TopCharts.json';
import ConcertData from '../data/futureEvents.json';
import songData from '../data/allTracks.json';
import thirdTitle from '../data/thirdTitle.json';

class Songs extends Component {
    constructor(props){
        super(props)

        this.state = {
            myFullName: '',
            myContent: '',
            submitted: false,
            thirdTitle: thirdTitle.name
        }

        this.inputFullNameRef = React.createRef()
        this.inputEmailRef = React.createRef()
//        fetch('/api/spotify/topresults')
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state

        //Resets CSS to artist view
        fetch('/api/seecss')

        //Get Bandsintown Data
        let request = '/api/bandsintown/' + data.myFullName + '/events/future'
        fetch(request);

//      Get Spotify Data
        request = '/api/spotify/search/' + data.myFullName
        fetch(request)
            .then(() => {
                //Reset Data file to have queried artist
                fetch('/api/spotify/select')
             })
        // console.log(this.inputFullNameRef.current.value)
//        this.setState({
//            hidden:false
//        });
        console.log("Final data is", data)
//        var x = document.getElementById("allTracks");
//        if (x.style.display === "none") {
//        x.style.display = "block";
//        } else {
//          x.style.display = "none";
//        }
         this.setState({thirdTitle: "Search Results"});
    }

    handleInputChange = (event) => {
        event.preventDefault()
       // console.log(event)
       // console.log(event.target.name)
       // console.log(event.target.value)
       this.setState({
           [event.target.name]: event.target.value
       })
//       if(this.state.submitted === false){
//           var x = document.getElementById("allTracks");
//           x.style.display = "none";
//       }
//       else{
//           var x = document.getElementById("allTracks");
//           x.style.display = "block";
//       }

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
            })

            //Clear from text fields
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            this.setState({
                itemvalues: [{}]
            });

            //Resets CSS, Bandsintown, and Spotify files to normal view
            fetch('/api/bandsintown/reset');
            fetch('/api/hidecss');
            fetch('/api/spotify/topresults')

            const data = this.state
            console.log("Final data is", data)
//            var x = document.getElementById("allTracks");
//            x.style.display = "none";
            this.setState({thirdTitle: "Top Songs of the Month:"});
    }
     componentDidMount(){
//         var x = document.getElementById("allTracks");
//         x.style.display = "none";
     }

  render () {
      const {myFullName} = this.state
      const {thirdTitle} = this.state

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
                    <h2>{thirdTitle}</h2>
                    {topCharts.map((topChartsDetail, index) => {
                        return <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                            <h3>{topChartsDetail.songName}</h3>
                            <img src= {topChartsDetail.albumImage} height = {270} width = {270}/>
                            <p>Artist: {topChartsDetail.artistName}</p>
                            <p>Popularity: {topChartsDetail.songPopularity}</p>
                            <p>{topChartsDetail.albumName}</p>
                        </div>
                    })}
                    </div>
                </Col>
            </Row>
            <Row id ="allTracks">
                <Col>
                    <div style= {{border: "5px solid", backgroundColor: "#2611c241", padding: "10px", marginBottom: "5px"}}>
                        <h2>All Songs by {songData[0].artistName}: </h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Song</th>
                                <th>Popularity</th>
                                <th>Length</th>
                                <th>Release Date</th>
                                </tr>
                            </thead>
                            {songData.map((songDetail, index) => {
                            return <tbody>
                                    <tr>
                                      <td>{songDetail.n}</td>
                                      <td>{songDetail.trackNameArray}</td>
                                      <td>{songDetail.trackPopularityArray}</td>
                                      <td>{songDetail.trackLength}</td>
                                      <td>{songDetail.trackReleaseDate}</td>
                                    </tr>
                                  </tbody>
                            })}
                        </Table>
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