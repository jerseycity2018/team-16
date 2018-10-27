import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import '../App.css'
import firebase, { auth, provider } from '../firebase.js'

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        user: firebase.auth().currentUser,
        beginCustomerCreation:false,
        shopify:{
          errors:null
        },
        errors:{}
      };


    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value 
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();

    }



    render() {
      return (
        <div className="Sign">
         <h1> BIG BRAIN GREEN CITY</h1>
         
        </div>
      );
    }
  }

  

  export default Login;