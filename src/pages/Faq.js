import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import '../App.css'
import firebase, { auth, provider } from '../firebase.js'

import {ListGroup,ListGroupItem, Container
 } from 'reactstrap';

export default class FAQ extends React.Component {
      render() {
   return (
     <Container>
       <h2>FAQ`S page</h2>

 <ListGroup>
 <ListGroupItem>Why do you need my information? To help associate to keep track of your points so you can redeem them</ListGroupItem>
 <ListGroupItem>Who can access my information? It is only accessible for employer</ListGroupItem>
 <ListGroupItem>What if I forget my password? You have to reset it with your email</ListGroupItem>
 <ListGroupItem>How do I get more points? Refer friends, take pictures of sustainable bulb, recycling bin, bringing compost, volunteer 1-3 hours in the farm</ListGroupItem>
 </ListGroup>

 </Container>
);
}
}