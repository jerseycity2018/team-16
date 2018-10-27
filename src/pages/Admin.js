import React, { Component } from 'react';
import '../App.css';
import firebase, { auth } from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { Button, Col, Row, Container, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem,
} from 'reactstrap';


class Admin extends Component {
  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    this.state = {
      user: user,
      loading:true,
      info: null,
      isAdmin:false
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
            { !this.state.isAdmin &&
                (<Redirect push to={{
                    pathname: '/profile',
                    search: '',
                    state: { referrer: 'signup' }
                }} /> )
            }
            <Container>
                <h1> My Profile</h1>
                <Row>
                    <p> push test</p>
                </Row>
            </Container>
        </div>

      );
    }
}





export default Admin;
