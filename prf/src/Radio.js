import React, { Component } from 'react';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.radioClicked= this.radioClicked.bind(this);
    }

    radioClicked(event) {
        var clicked = event.target.childNodes[1];
        var setValue = clicked.value;
        var sibling = event.target.nextSibling;
        if(sibling === null) 
            sibling = event.target.previousSibling;
        event.target.classList.toggle('checked');
        sibling.classList.remove('checked');
        if(clicked.value === this.props.parent.state.mail)
            setValue = '';
        this.props.parent.setState({
            mail: setValue
        })
    }

    render() {
        var radio1 = false;
        var radio2 = false;
        if(this.props.parent.state.mail === 'true') {
            radio1 = true;
        } 
        else if(this.props.parent.state.mail === 'false') {
            radio2 = true;
        }
        return (
            <div className="Question">
                <h4>{this.props.question}</h4>
                <div className='radio' onClick={this.radioClicked}>
                    {this.props.choice1}
                    <input type="radio" id="button1" disabled={true} checked={radio1} name={this.props.name} value={true}></input><br/>
                </div>
                <div className='radio' onClick={this.radioClicked}>
                    {this.props.choice2}
                    <input type="radio" id="button2" disabled={true} checked={radio2} name={this.props.name} value={false}></input><br/> 
                </div>
            </div>
        );
    }
}

export default Radio;
