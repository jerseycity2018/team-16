import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container , Row, Col, Button, 
    Table
  } from 'reactstrap';

import '../App.css';
import Menu from "../Menu.js";

export default class Settings extends Component {
render () {
    return (
      <div className = "settings">
        <Menu />
        <Container>
            <div>
                Settings
          </div>
        </Container>
    </div>
    );
    }
}