import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menu: false,
    }
  }

  changeMenu = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  handleClickOutside = () => {
    this.setState({
      menu: false
    })
  }

  navStyle = {
    background: this.props.background,
    color: this.props.color
  }

  render() {
    return (
      <Navbar className='navbar' bg="none" expand="sm">
        <Navbar.Toggle className='ml-auto navbar__control' aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href='/stories'>Stories</Nav.Link>
            <Nav.Link href="/gallery">Gallery</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default onClickOutside(Navigation);
// export default Navbar
