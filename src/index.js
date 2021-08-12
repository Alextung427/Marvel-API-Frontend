import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import CharacterRoute from './Components/CharacterRouting.js';
import AllCharactersRoute from './Components/AllCharactersRouting.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import App from './App';

const history = createBrowserHistory()

const routeElement = (
  <Router history={history}>
    <Switch>
      <Route exact path="/AllCharacters" component={AllCharactersRoute} />
      <Route exact path="/AllCharacters/:id" component={CharacterRoute} />
    </Switch>
  </Router>
)

ReactDOM.render(routeElement, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
