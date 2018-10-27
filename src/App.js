import React, { Component } from 'react'
import Login from './pages/Login'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Login/>
        </div>
      </div>
    );
  }
}

export default App;