import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import '../App.css'
import firebase, { auth, provider } from '../firebase.js'

import { Container , Row, Col, Button, 
    Form, FormGroup, Input, Check, Label
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
        newUser: true,
        errors:{}
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
        firebase.database().ref('users/').child(user.uid).push({
          name: this.state.name,
          email: this.state.email,
          joined: Date.now(),
          language:"",
          nycha:{
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

                { firebase.auth().currentUser && !this.state.inprogress &&
                    (<Redirect push to={{
                        pathname: '/profile',
                        search: '',
                        state: { referrer: 'login' }
                    }} /> )
                 }

                {this.state.newUser ? 
                (
                    <Container>
                        <h1>Sign Up </h1>
                        
                        <Form>
                            <Container>
                            {/* Get first and last name from user */}
                                <FormGroup row>
                                <Col sm={6}>
                                    <Input type="first name" name="first name" id="first name" placeholder = "First Name" value={this.state.name} onChange={this.handleChange}/>
                                </Col>
                                </FormGroup>
                            {/* Get email from user */}
                                <FormGroup row>
                                <Col sm={4} >
                                    <Input name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                </Col>
                                <Col sm={4}>
                                    <Input name="email" type="text" placeholder="Confirm Email" value={this.state.confirmEmail} onChange={this.handleChange} />
                                </Col>
                                </FormGroup>
                                
                            {/* Get password from user */}
                                <FormGroup row>
                                <Col sm={4} >
                                    <Input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                </Col>
                                <Col sm={4}>
                                    <Input name="password" type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} />
                                </Col>
                                </FormGroup>
                            
                            <FormGroup row>
                                <Col sm={4}>
                                    <Label for="Borough Name">Building Name</Label>
                                    <Input type="select" name="Borough Name" id="Borough Name" defaultValue = "Borough Name">
                                        <option>Brooklyn</option>
                                        <option>Bronx</option>
                                        <option>Manhatten</option>
                                        <option>Staten Island</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <Button onClick={this.handleSubmit}>Create Account</Button>
                            <Button onClick={this.switch}>Returning User? Sign In</Button>
                            
                            </Container>
                        </Form>
                        
                    </Container>
 
      
                )
                :
                (
                    <Container>
                        <h1> Log In </h1>
                        <Button onClick={this.switch}>New User? Sign Up</Button>
                    </Container>
                )}
    

                

                
            </div>
        );
    }
  }

  

  export default Login;