import React, { Component } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import Toggler from './NavbarToggler';


class Navbar2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openNav: false
    }
  }

  openNav = () => {
    this.setState({
      openNav: !this.state.openNav
    })
  }

  render() {
    return (
      <div className='navbar'>
        <Toggler onClick={this.openNav}/>
          <Spring
            from={{ transform: 'translate(0, -100vh)' }}
            to={{ transform: !this.state.openNav ? 'translate(0, -100vh)' : 'translate(0, 0)' }}
            config={config.slow}
          >
            {props =>
              <div style={props} className='navbar_open'>
                <div className='navbar_logo'>
                  <p>Piros <br /> Photography.</p>
                </div>
                <div className='navbar_links-container'>
                  <p onClick={this.props.goPage} className='navbar_link' value='home'>Home.</p>
                  <p onClick={this.props.goPage} className='navbar_link' value='stories'>Stories.</p>
                  <p onClick={this.props.goPage} className='navbar_link' value='gallery'>Gallery.</p>
                  <p onClick={this.props.goPage} className='navbar_link' value='about'>About.</p>
                </div>
              </div>
            }
          </Spring>
      </div>
    );
  }
}

export default Navbar2;