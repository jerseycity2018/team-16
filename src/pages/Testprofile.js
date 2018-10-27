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
        <Row>
        <Col className = "text-left">
        <h1> My Profile </h1>
        </Col>
        <div class = "circle"></div>
        <div class="content">
            <div class="content-block">
                <p>sldjfa;sldfj</p>
            </div>
        </div>
        </Row>
        {
        <li>
        <a href="https://calendar.google.com/calendar/r?pli=1">
       <img class="googleCalendar" src="https://calendar.google.com/calendar/r?pli=1" width="40" alt="googleCalendar"></img>
        </a>
        </li>
        }
        </Container>
        )
        }
    }