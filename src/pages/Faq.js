import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import '../App.css'
import firebase, { auth, provider } from '../firebase.js'
import {ListGroup, ListGroupItem, Button, Col, Row, Container, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu,DropdownItem,
  ListGroupItemHeading,ListGroupItemText
 } from 'reactstrap';
 import Menu from "../Menu.js";
 
 
 export default class Faq extends Component {
      render() {
        return (
        <div className="App" id="profile">
            <Menu />
            <Container>
            <h1>FAQ page</h1>
        <ListGroup>
        <ListGroupItem>
            <ListGroupItemHeading>Why do you need my information?</ListGroupItemHeading> 
            <ListGroupItemText>  To help associate your green activity to your account so you can redeem points for free things!</ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
            <ListGroupItemHeading>Who can access my information?</ListGroupItemHeading> 
            <ListGroupItemText>Anonymized user data will be used by Green City Force for analytics, and no one will be able to get your passwords etc</ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
            <ListGroupItemHeading>What if I forget my password?</ListGroupItemHeading> 
            <ListGroupItemText>You have to reset it with your email</ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
            <ListGroupItemHeading>How do I get more points?</ListGroupItemHeading> 
            <ListGroupItemText>Refer friends, take pictures of sustainable bulbs in your apartment, use the recycling bins, bring compost, or volunteer 1-3 hours on the farm</ListGroupItemText>
        </ListGroupItem>
        </ListGroup>

 </Container>
 </div>
);
}
}