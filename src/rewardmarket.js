import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container , Row, Col, Button, 
    Form, Table
  } from 'reactstrap';

render () {
    return (
    <Container>
        <Table>
        <thead>
          <tr>
            <th></th>
            <th>Reward</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Locally Made Lip Balm</td>
            <td>- 10</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Lip Balm</td>
            <td>-10</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>$ 10 Gift Card</td>
            <td>- 30 points</td>
          </tr>
        </tbody>
      </Table>
    </Container>
    );
    }