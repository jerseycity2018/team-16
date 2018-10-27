import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container , Row, Col, Button, 
    Table
  } from 'reactstrap';

import firebase, { auth } from '../firebase.js';
import '../App.css';
import Menu from "../Menu.js";

export default class Settings extends Component {
    constructor(props) {
        super(props);
        const user = firebase.auth().currentUser;
        this.state = {
          user: user,
        };
        this.logout = this.logout.bind(this);
      }

      logout(e) {
        e.preventDefault();
        auth.signOut()
      }

    render () {
        return (
        <div className = "settings">
            { !firebase.auth().currentUser &&
                    (<Redirect push to={{
                        pathname: '/login',
                        search: '',
                        state: { referrer: 'signup' }
                    }} /> )
            }
            <Menu />
            <Container>
                <div>
                    <Row>
                        <Col className = "text-center">
                            <h1>Settings</h1>
                        </Col>
                    </Row>
                   
                    <Row>
                        <Col className = "text-center">
                            <Button onClick={this.logout}>Sign Out</Button>
                        </Col>
                    </Row>
            </div>
            </Container>
        </div>
        );
    }
}