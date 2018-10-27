import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container , Row, Col, Button, 
    Table
  } from 'reactstrap';

export default class Rewardmarket extends React.Component {
render () {
    return (
    <Container>
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
            <td>-10 Points</td>
          </tr>
          <tr>
            <td><Button color = "primary">Farm Made Lotion</Button></td>
            <td>-10 Points</td>
          </tr>
          <tr>
            <td><Button color = "primary">$10 Gift Card</Button></td>
            <td>-25 Points</td>
          </tr>
        </tbody>
      </Table>
      </div>
    </Container>
    );
    }
}