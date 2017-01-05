import { Router, Route, hashHistory } from 'react-router';
import App from './App.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

import AMovie from './components/AMovie.jsx';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/movie/:title" component={AMovie}/>
  </Router>
  
), document.getElementById('app'))
