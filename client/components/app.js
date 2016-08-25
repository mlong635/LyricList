import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, browserHistory } from 'react-router';
// import './style/style.css';

export default class App extends Component {
  
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};



