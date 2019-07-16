import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import onClickOutside from "react-onclickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
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
      <div className={this.props.navClass}>
        <div onClick={this.changeMenu} className='navbar_index-button'>
          <p className={this.props.navTextClass}>Index</p>
          { this.state.menu && 
            <FontAwesomeIcon className={this.props.iconClass} icon={faTimesCircle}></FontAwesomeIcon>
          }
        </div>
        { this.state.menu && 
          <ul >
            <li className='navbar_index-link' onClick={this.changeMenu}><NavLink to='/'>Homepage</NavLink></li>
            <li className='navbar_index-link' onClick={this.changeMenu}><NavLink to='/stories'>Stories</NavLink></li>
            <li className='navbar_index-link' onClick={this.changeMenu}><NavLink to='/gallery'>Gallery</NavLink></li>
            <li className='navbar_index-link' onClick={this.changeMenu}><NavLink to='/about'>About</NavLink></li>
          </ul>
        }
      </div>
    );
  }
}

export default onClickOutside(Navbar);
// export default Navbar
