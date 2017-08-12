import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


import {App, Main} from './containers/index';


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Main}/>
            <Route path="/home" component={App}/>
        </div>
    </Router>
    , document.getElementById('root')
);