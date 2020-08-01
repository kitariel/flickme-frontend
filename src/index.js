import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Provider } from 'react-redux';
// import store from './store';

import App from './App';
import './index.css';

ReactDOM.render(
    <Router>
        <Route path="/" component={App} />
    </Router>,
    document.getElementById('app')
);