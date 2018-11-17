import React, { Component } from 'react';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.parent.setState({
            [this.props.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="Question">
                <h4>{this.props.question}</h4>
                    <input type="text" name="Name" value={this.props.value} onChange={this.handleChange}></input>
            </div>
        );
    }
}

export default Question;
