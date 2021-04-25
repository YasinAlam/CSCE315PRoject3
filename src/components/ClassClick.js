import React, {Component} from 'react'
import Songs from './Songs';


class ClassClick extends Component {
call(){
    <Songs />
}

    render() {
        return (
            <div>
                <button onClick={this.call}>Click me</button>
            </div>
        )
    }
}

export default ClassClick