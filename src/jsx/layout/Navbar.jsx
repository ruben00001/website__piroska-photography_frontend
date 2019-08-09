import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false
    }
  }

  changeMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  handleClickOutside = evt => {
    this.setState({
      menuOpen: false
    });  
  }

  render() {
    let navbarStyle = {};
    if(this.state.menuOpen) {
      navbarStyle = { background: 'white' };
    }
    return (
      <Navbar className='navbar fixed-top' bg="none" expand=''
        style={navbarStyle} 
        expanded={this.state.menuOpen}
        onToggle={this.changeMenu}
      >
        <Navbar.Toggle className='ml-auto navbar__control custom-toggler' aria-controls="basic-navbar-nav" 
         onClick={this.changeMenu} 
        />
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
