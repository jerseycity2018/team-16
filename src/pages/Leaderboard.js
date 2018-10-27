import React, { Component } from 'react';
import '../App.css';
import firebase, { auth } from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { Button, Col, Row, Container, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem,
} from 'reactstrap';

import Menu from "../Menu.js";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    this.state = {
      user: user,
      loading:true,
      info: null,
      userRankings: null,
    };
    this.logout = this.logout.bind(this);
    this.findUserRank = this.findUserRank.bind(this);
  }

  logout(e) {
    e.preventDefault();
    auth.signOut()
  }


  findUserRank(){
    const usersRef = firebase.database().ref('users').orderByChild('points').orderByValue('lifetime');
    usersRef.on('value', (snapshot) => {
        let newState = [];

        snapshot = snapshot.val();
        snapshot.forEach(function(childSnapshot) {
        newState.push({
            user: childSnapshot.uid,
            points: childSnapshot.val().lifetime,
        });
    });

    this.setState({
        userRankings: newState
    });
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
        let data = snapshot.val();
        let tier;
        //console.log(data);
        for (let post in data) {
          this.setState({info: data[post]})
        }

      })
    }

    // const usersRef = firebase.database().ref('leaderboard').child('byUsers').orderByValue();
    // usersRef.on('value', (snapshot) => {
    //         let newState = [];
    //         console.log(snapshot)
    //         snapshot = snapshot.val();
    //         snapshot.forEach(function(childSnapshot) {
    //             newState.push({
    //                 user: childSnapshot.uid,
    //                 points: childSnapshot.val().lifetime,
    //             });
    //         });

    //     this.setState({
    //         userRankings: newState
    //     });
    // });




  }

  render() {
      return (
        <div className = "App" id="profile">
            <Menu />
            <Container>
              Leaderboard
              {this.state.userRankings && this.state.userRankings[0]}
            </Container>
        </div>
        );
    }
}





export default Leaderboard;
