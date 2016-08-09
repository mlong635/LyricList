// This is the entry point of the app.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import reducers from './reducers/mainReducer';
import promise from 'redux-promise';

// import App from './containers/app.js';

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
  , document.querySelector('#app'));

// old code below
// import App from './containers/app.js';
// import 'babel-polyfill';

// if (module.hot) {
//   module.hot.accept();
// }
