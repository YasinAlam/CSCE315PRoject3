import React, { Component } from 'react'
import PostData from '../data/test.json'
 
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
        <div>
            <h1>Top Movies of the Month: </h1>
            {PostData.map((postDetail, index) => {
                return <div>
                    <p>{postDetail.title}</p>
                    <p>Year of Release: {postDetail.year}</p>
                </div>
            })}
        </div>
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