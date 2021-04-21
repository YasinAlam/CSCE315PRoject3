import React, { Component } from 'react'

 
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
        <Container>
            <Row>
                <Col>
                <div>
                 <p>Selected Movie: {myFullName}</p>
                 <form onSubmit={this.handleSubmit}>
                    <MyInputBlock onChange={this.handleInputChange} inputFullName="myFullName" inputContentName='myContent'/>

                    <p><button>Search</button></p>
                    <p><button onClick={this.handleClearClick}>Clear</button></p>
                 </form>
                 
                 </div>
                 {PostData.map((postDetail, index) => {
                        return <div>
                            <img src= {postDetail.poster} height = {320} width = {270}/>
                        </div>
                        
                    })}
                 <p>Selected movie Release Date: </p>
                 <p>Selected movie Runtime: </p>
                 <p>Selected movie Genre: </p>
                 <p>Selected movie Rating: </p>
                 <p>Selected movie Synopsis: </p>
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

export default Songs