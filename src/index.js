import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter, Switch} from 'react-router-dom'
import firebase from './firebase.js';

import Login from './pages/Login.js';
import App from './App.js';



const loadApp = function(){
    render((
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </BrowserRouter>
      ), document.getElementById('root'))
}


loadApp();





