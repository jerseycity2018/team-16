import React, { Component } from 'react';
import './App.css';
import { Link} from 'react-router-dom'
import { Col, Row, Container, Collapse,
  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:"/profile",
      collapsed:true
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }


  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }


  componentDidMount(){

  }

  render() {
      return (

        <Container>
            <Row>
                <Col className = "text-center">
                    <Navbar color="green" light>
                        <NavbarToggler  onClick={this.toggleNavbar} className="mr-2" />
                        <NavbarBrand href="/" className="mr-auto">Greener City Force </NavbarBrand>
                        <Collapse isOpen={!this.state.collapsed} navbar>
                            <Nav navBar>
                                <NavItem>
                                    <NavLink tag = {Link}  to="/profile">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag = {Link}  to="/shop">Shop</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag = {Link} to="/leaderboard">Leader Board</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag = {Link} to="/faq"> FAQ </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag = {Link} to="/settings"> Settings </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container>

      );
    }
}





export default Menu;
