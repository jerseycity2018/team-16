import React, { Component } from 'react';
import '../App.css';
import firebase, { auth } from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { Button, Col, Row, Container, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem, Table,
} from 'reactstrap';

import Rewardmarket from "./Rewardmarket.js"

class Profile extends Component {
  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    this.state = {
      user: user,
      loading:true,
      info: null
    };
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    auth.signOut()
  }

//Testing git.

  componentDidMount(){
    const currentUser = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user:user});
    });

    if(currentUser){
      const userdata = firebase.database().ref('users/' + currentUser.uid);
      userdata.on('value', (snapshot) => {
        let data = snapshot.val();
        let tier;
        //console.log(data);
        for (let post in data) {
          this.setState({info: data[post]})
        }

      })

    }

  }

  render() {
      return (
        
        <div className = "App" id="profile">
        

            <Container>
            <div class = "background-white"></div>
                <h1> My Profile</h1>
                <Row>
                    <p> push test</p>
                </Row>
        
            
            { !firebase.auth().currentUser &&
                (<Redirect push to={{
                    pathname: '/login',
                    search: '',
                    state: { referrer: 'signup' }
                }} /> )
            }
            {this.state.info &&
                <Container>
                    <h1> {this.state.info.email} </h1>
                    <Row>
                        <p> push test</p>
                        <Button onClick = {this.logout}> Log Out </Button>
                    </Row>
                </Container>
            }
            
            <Container>
        <div class="body"></div>
        <Row>
        <Col className = "text-left">
        <h1> My Profile </h1>
        </Col>
        <div class = "circle"></div>
        {
        <div class="content">
            <div class="content-block">
                <p>You have x points!</p>
            </div>
        </div>
        }
        </Row>
        
        <div class="cal-container">
        <iframe src="https://calendar.google.com/calendar/embed?src=tbashar09%40gmail.com&ctz=America%2FNew_York" 
        border="0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
        
        

            
        
        </Container>
            </Container>
        </div>

      );
    }
}





export default Profile;
