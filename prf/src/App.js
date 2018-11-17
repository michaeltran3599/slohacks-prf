import React, { Component } from 'react';
import './App.css';
import QuestionContainer from './QuestionContainer';

class App extends Component {

    state = {
        message: "",
        error: "",
        eee: "",
        text: ""
      };
    
  render() {
    return (
        <div className="App">
            <div className='spacer'></div>
            <QuestionContainer></QuestionContainer>
        </div>
    );
  }
}

export default App;