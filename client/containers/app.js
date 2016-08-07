import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }
  
  render() {
    return (
      <div className="SongList">
        <h2>Here is your list of songs you've been working on:</h2>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.querySelector("#app"));

export default App;


