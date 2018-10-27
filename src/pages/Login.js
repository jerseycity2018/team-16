import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import '../App.css'
import firebase, { auth, provider } from '../firebase.js'

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        newUser: false,
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

    addUserToDatabase(){
        let user = firebase.auth().currentUser;
        
        this.setState({user:firebase.auth().currentUser})
        firebase.database().ref('users/' + user.uid).push({
          name: "",
          firstName: "",
          lastName: "",
          email: "",
          provider: "",
          joined: Date.now(),
          NYCHA:{
              location:"",
              floor:0
          },
          points:{
            lifetime:0,
            balance:0,
          },
          referrals:{
            count:0,
            referrer:null
          },
          language:"",

        })
        .then(() => {
  
        })
        .catch(function(error) {
        // Handle Errors here.
        console.log(error.code + ": " + error.message);
        this.setState({errors:error.message});
        });
  
      }


    render() {
      return (
        <div className="Sign">
            <Container>
                <h1>  Make NYCHAS Greener </h1>

                {this.state.newUser ? 
                (
                    <h1>Sign Up </h1>


                )
                :
                (

                    <h1> Log In </h1>

                )}
            </Container>
         
        </div>
      );
    }
  }

  

  export default Login;