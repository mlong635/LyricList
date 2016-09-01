import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, browserHistory } from 'react-router';
import mainReducer from '../reducers/mainReducer';
// import './style/style.css';
import createLogger from 'redux-logger';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore);

export default class App extends Component {
  
  render() {

    return (
      <Provider store={createStoreWithMiddleware(mainReducer)}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    );
  }
};



