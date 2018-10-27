import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter, Switch} from 'react-router-dom'
import firebase from './firebase.js';

import Login from './pages/Login.js';
import Admin from './pages/Admin.js';
import Profile from './pages/Profile.js';
import App from './App.js';



const loadApp = function(){
    render((
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/admin" component={Admin}/>
                    {/* <Route path="/faq" component={FAQ}/> */}
                </Switch>
            </BrowserRouter>
      ), document.getElementById('root'))
}


firebase.auth().onAuthStateChanged(user => {
    loadApp();
});





