import React, { Component } from 'react';
import '../App.css';
import firebase, { auth } from '../firebase.js';
import { Redirect } from 'react-router-dom'
import { Button, Col, Row, Container, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem,
  Table
} from 'reactstrap';

import Menu from "../Menu.js";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    this.state = {
      user: user,
      loading:true,
      info: null,
      leaderData:[]
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

    let leaderInfo = [];
    const usersRef = firebase.database().ref('leaderboard').child('byUser').orderByValue().limitToLast(5);
    usersRef.on('value', (snapshot) => {

        let data = snapshot.val();

        snapshot.forEach( (leader) => {
          firebase.database().ref('users').child(leader.key).once('value',  (snapshot) => {
            let data = snapshot.val();
            console.log(data)
            leaderInfo.push({
              name: data.name,
              points:data.total,
              location:data.location
            })
          });
        })

        this.setState({
            leaderData: leaderInfo
        });
    })



  }

  render() {
      console.log(this.state.leaderData)
      return (
        <div className = "App" id="profile">
            <Menu />
            <Container>
              <Row>
                  <Col className = "text-center">
                      <h1>  Leaderboard </h1>
                  </Col>
              </Row>
            

              <Table striped>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Borough</th>
                    <th>Lifetime Points</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.leaderData.map((user,i) => {
                    return(
                    <tr key = {i}>
                      <th scope="row">{i+1}</th>
                      <td> {user.name} </td>
                      <td> {user.location} </td>
                      <th> {user.points} </th>
                    </tr>
                    );
                    })}

                </tbody>
              </Table>
            </Container>
        </div>

    );
    }
}
