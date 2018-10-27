import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container , Row, Col, Button, 
    Table
  } from 'reactstrap';

import '../App.css';
import Menu from "../Menu.js";

export default class Shop extends Component {
  render () {
      return (
        <div className = "shop">
          <Menu />
          <Container>
              <Row>
                <Col className = "text-center">
                  <h1>Green City Force Shop</h1>
                </Col>
              </Row>
              <br />
              <div>
                <Table>
                <thead>
                  <tr>
                    <th>Reward</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Button color = "primary">Farm Made Lip Balm</Button></td>
                    <td>10 Points</td>
                  </tr>
                  <tr>
                    <td><Button color = "primary">Farm Made Lotion</Button></td>
                    <td>10 Points</td>
                  </tr>
                  <tr>
                    <td><Button color = "primary">$10 Gift Card</Button></td>
                    <td>25 Points</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Container>
      </div>
      );
    }
}