import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container , Row, Col, Button, 
    Table
  } from 'reactstrap';
import "../App.css"

export default class Testprofile extends React.Component {
    render () {
        return(
        <Container>
        <div class="background-color"></div>
        <Row>
        <Col className = "text-left">
        <h1> My Profile </h1>
        </Col>
        <div class = "circle"></div>
        {
        <div class="content">
            <div class="content-block">
                <p>You have x points!</p>
            </div>
        </div>
        }
        </Row>
        
        <div class="cal-container">
        <iframe src="https://calendar.google.com/calendar/embed?src=tbashar09%40gmail.com&ctz=America%2FNew_York" 
        border="0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
        
        

            
        
        </Container>
        )
        }
    }