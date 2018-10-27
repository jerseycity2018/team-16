import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container , Row, Col, Button, 
    Table
  } from 'reactstrap';

export default class Testprofile extends React.Component {
    render () {
        return(
        <Container>
        <Row>
        <Col className = "text-left">
        <h1> My Profile </h1>
        </Col>
        </Row>
        
        
        </Container>
        )
        }
    }