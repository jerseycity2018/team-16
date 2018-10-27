import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import '../App.css'
import firebase, { auth, provider } from '../firebase.js'

import { Container , Row, Col, Button, 
    Form, FormGroup,FormText, 
    Input,FormFeedback
  } from 'reactstrap';


class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        location: '',
        floor: 0,
        referrer: null,
        language: '',
        newUser: false,
        errors:{}
      };

      this.handleChange = this.handleChange.bind(this);
      this.switch = this.switch.bind(this);
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value 
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();

      //TODO: FORM VALIDATION
      this.setState({
        inprogress:true,
      });
      
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: this.state.name
          }).then(() => { 
            this.setState({
              user: firebase.auth().currentUser,
            });
            this.addUserToDatabase();
          });;
        })
        .catch(function(error) {
        // Handle Errors here.
        console.log(error.code + ": " + error.message)
        });

    }

    switch(){
        this.setState({newUser: !this.state.newUser})
    }

    addUserToDatabase(){
        let user = firebase.auth().currentUser;
        
        this.setState({user:firebase.auth().currentUser})
        firebase.database().ref('users/' + user.uid).push({
          name: this.state.name,
          email: this.state.email,
          joined: Date.now(),
          language:"",
          NYCHA:{
              location:this.state.location,
              floor:this.state.floor
          },
          points:{
            lifetime:0,
            balance:0,
          },
          referrals:{
            count:0,
            referrer:this.state.referrer
          },
          language:this.state.language,
          role:"user"

        })
        .then(() => {
            this.setState({inprogress:false})
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
                <h1>  Make NYCHAS Greener </h1>

                {this.state.newUser ? 
                (
                    <Container>
                        <h1>Sign Up </h1>
                        <Button onClick={this.switch}>Sign Up</Button>
                        <Form>
                            <Container>
                                <FormGroup row>
                                <Col sm={4}>
                                    <Input name="name" type="text" placeholder="name" value={this.state.name} onChange={this.handleChange} />
                                </Col>
                                <Col sm={4} >
                                    <Input name="email" type="text" placeholder="email@domain.com" value={this.state.email} onChange={this.handleChange} />
                                </Col>
                                </FormGroup>
                                
                            </Container>
                        </Form>
                    </Container>
                )
                :
                (
                    <Container>
                        <h1> Log In </h1>
                    </Container>
                )}
        </div>
      );
    }
  }

  

  export default Login;