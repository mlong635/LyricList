import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, browserHistory } from 'react-router';


export default class App extends Component {
  // constructor(props){
  //   super(props);

  //   this.state = {

  //   }
  // }
  
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

// ReactDOM.render(<App />, document.querySelector("#app"));

// export default App;


