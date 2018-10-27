import React, { Component } from 'react';
import '../App.css';
import firebase, { auth } from '../firebase.js';
import { Redirect, Link} from 'react-router-dom'
import { Button, Col, Row, Container, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem, Table,
} from 'reactstrap';

import Menu from "../Menu.js";

class Profile extends Component {
  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    this.state = {
      user: user,
      loading:true,
      info: null,
      collapsed:false
    };

    this.logout = this.logout.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  logout(e) {
    e.preventDefault();
    auth.signOut()
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
    
  componentDidMount(){
    const currentUser = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user:user});
    });

    if(currentUser){
      const userdata = firebase.database().ref('users/' + currentUser.uid);
      userdata.on('value', (snapshot) => {
          this.setState({info: snapshot.val()})
      })
    
    }

  }

  render() {
      return (
        
        <div className = "App" id="profile">

            <Container>
            <div class = "background-white"></div>
                <h1> My Profile</h1>
            

            { !firebase.auth().currentUser &&
                    (<Redirect push to={{
                        pathname: '/login',
                        search: '',
                        state: { referrer: 'signup' }
                    }} /> )
            }

            <Menu/>
            </Container>

            {this.state.info &&
                <Container>
                    <Row>
                        <Col className = "text-center">
                            <h1>  {this.state.info.name} </h1>
                        </Col>
                    </Row>
            
                    <Row>
                        <Col className = "text-center">
                            <h1>  {this.state.info.email} </h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col className = "text-center">
                            <h1> Points: {this.state.info.total} </h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col className = "text-center">
                            <h1> Balance: {this.state.info.total} </h1>
                        </Col>
                    </Row>
                
                    <Row>
                        <Col className = "text-center">
                            <Button onClick = {this.logout}> Log Out </Button>
                        </Col>
                    </Row>
                </Container>
            }
            
            <Container>
        <div class = "circle">

        </div>
        
        <div class="cal-container">
        <iframe src="https://calendar.google.com/calendar/embed?src=tbashar09%40gmail.com&ctz=America%2FNew_York" 
        border="0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
        
        

            
        
        </Container>
        </div>

      

      );
    }
}





export default Profile;
