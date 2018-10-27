import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import '../App.css'
import firebase, { auth, provider } from '../firebase.js'

import { Container , Row, Col, Button, Collapse,
    Form, FormGroup, Input, Check, Label
  } from 'reactstrap';

  import Leaderboard from './Leaderboard.js';


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
      this.signup = this.signup.bind(this);
      this.login = this.login.bind(this);
      this.switch = this.switch.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value)
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    signup(event) {

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
        .catch((error) => {
        // Handle Errors here.
        console.log(error.code + ": " + error.message)
        });

    }

    login(event){
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {

        }).catch((error) => {
        // Handle Errors here.
        this.setState({errors:error.code});
        });
    }

    switch(){
        this.setState({newUser: !this.state.newUser})
    }

    addUserToDatabase(){
        let user = firebase.auth().currentUser;

        this.setState({user:firebase.auth().currentUser})
        firebase.database().ref('users/').child(user.uid).update({
          name: this.state.name,
          email: this.state.email,
          joined: Date.now(),
          location:this.state.location,
          total:0,
          balance:0,
          referralCount:0,
          referrer:this.state.referrer,
          language:this.state.language,
          role:"user"

        })
        .then(() => {
            firebase.database().ref('leaderboard').child('byUser').update({
                [user.uid]:0
            }).then(() => {
                this.setState({inprogress:false})
            })
        })
        .catch((error) => {
            // Handle Errors here.
            console.log(error.code + ": " + error.message);
            this.setState({errors:error.message});
        });

      }

    render() {
      return (


        <div className="Sign">


                { firebase.auth().currentUser && !this.state.inprogress &&
                    (<Redirect push to={{
                        pathname: '/profile',
                        search: '',
                        state: { referrer: 'login' }
                    }} /> )
                 }

                    <Container>

                        <Row>
                            <Col className = "text-center">
                                <h1>  Make NYCHAS Greener </h1>
                            </Col>
                        </Row>

                        <Row>
                            <Col className = "text-center">
                                <h1> Login </h1>
                                <h1> {this.state.newUser ? "Sign Up!" : "Log In"} </h1>
                            </Col>
                        </Row>

                        <Form>
                            <Container>
                            {/* Get first and last name from user */}

                            <Collapse isOpen = {this.state.newUser}>
                                <FormGroup row>

                                    <Col className = "col-centered" sm={6}>
                                        <Input  name="name"  placeholder = "Name" value={this.state.name} onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                            </Collapse>
                            {/* Get email from user */}
                                <FormGroup row>

                                    <Col  className = "col-centered" sm={6} >
                                        <Input name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>

                                <Collapse isOpen = {this.state.newUser}>
                                    <FormGroup row>
                                        <Col  className = "col-centered" sm={6} >
                                            <Input name="confirmEmail" type="text" placeholder="Confirm Email" value={this.state.confirmEmail} onChange={this.handleChange} />
                                        </Col>
                                    </FormGroup>
                                </Collapse>

                            {/* Get password from user */}
                                <FormGroup row>

                                    <Col className = "col-centered" sm={6} >
                                        <Input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                                <Collapse isOpen = {this.state.newUser}>
                                    <FormGroup row>
                                        <Col className = "col-centered"sm={6}>
                                            <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col className = "col-centered" sm={6}>
                                            <Label for="Borough Name">Building Name</Label>
                                            <Input type="select" name="location" id="Borough Name"  value={this.state.location} onChange={this.handleChange}>
                                                <option value = "">Select</option>
                                                <option value = "brooklyn">Brooklyn</option>
                                                <option value = "bronx">Bronx</option>
                                                <option value = "manhattan">Manhatten</option>
                                                <option value = "statenisland">Staten Island</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col className = "col-centered"sm={6}>
                                            <Input name="language" type="text" placeholder="Preferred Language" value={this.state.language} onChange={this.handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col className = "text-center" >
                                            <Button onClick={this.signup}>Create Account</Button>
                                        </Col>
                                    </FormGroup>
                                </Collapse>

                                {!this.state.newUser &&

                                    <FormGroup row>
                                        <Col className = "text-center">
                                            <Button onClick={this.login}>Login</Button>
                                        </Col>
                                    </FormGroup>
                                }
                                {!this.state.newUser &&
                                    <FormGroup row>
                                        <Col className = "text-center">
                                            <Button onClick={this.switch}>New User</Button>
                                        </Col>
                                    </FormGroup>
                                }
                                {this.state.newUser &&
                                    <FormGroup row>
                                        <Col className = "text-center">
                                            <Button onClick={this.switch}>Back to User Login</Button>
                                        </Col>
                                    </FormGroup>
                                }

                            </Container>
                        </Form>

                    </Container>






            </div>
        );
    }
  }



  export default Login;