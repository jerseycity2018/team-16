import React, { Component } from 'react';
import '../App.css';
import firebase, { auth } from '../firebase.js';
import { Redirect, Link} from 'react-router-dom'
import { Button, Col, Row, Container, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem, Table,
  Card,CardTitle,CardText,CardBody
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
            <div className = "background-white"></div>
            

            { !firebase.auth().currentUser &&
                    (<Redirect push to={{
                        pathname: '/login',
                        search: '',
                        state: { referrer: 'signup' }
                    }} /> )
            }

            <Menu/>
            </Container>

            
            <Container>
                {this.state.info && 

                    <Row>
                        <Col className = "text-center">
                            <Card body color = "success">
                                <Container>
                                    <CardTitle className = "largeText">{this.state.info.name}</CardTitle>
                                    <CardText>{this.state.info.email}</CardText>
                                    <CardText> Lifetime Points: {this.state.info.total}</CardText>
                                    <CardText> Spending Balance: {this.state.info.balance}</CardText>
                                    <Link to ="/shop" className = "spendlink">Spend Your points</Link>
                                </Container>
                            </Card>
                        </Col>
                    </Row>
                }
                
                <br />

                <Row>
                    <Col className = "text-center">
                        <h1> Upcoming Events </h1>
                    </Col>
                </Row>
                <div class="cal-container">
                <iframe src="https://calendar.google.com/calendar/embed?src=tbashar09%40gmail.com&ctz=America%2FNew_York" 
                border="0" width="100%" height="100%" frameBorder="0" scrolling="no"></iframe>
                </div>
        
        </Container>
        </div>

      

      );
    }
}





export default Profile;
