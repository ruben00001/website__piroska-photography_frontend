import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Spring, config } from 'react-spring/renderprops';
import Toggler from './NavbarToggler';


class Navbar2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openNav: false,
      leavePage: false,
    }
  }

  openNav = () => {
    this.setState({
      openNav: !this.state.openNav
    })
  }

  goPage = (e) => {    
    let route = `/${e.currentTarget.getAttribute('value')}`;
    this.setState({
      leavePage: true
    }, _ => {
      setTimeout(() => {
        this.props.history.push(route)
      }, 1200);
    })
  }

  render() {
    return (
      <div className='navbar'>
        <Toggler onClick={this.openNav} />
        <Spring
          from={{ transform: 'translate(0, -100vh)' }}
          to={{ transform: !this.state.openNav ? 'translate(0, -100vh)' : 'translate(0, 0)'}}
          config={config.slow}
        >
          {props =>
            <div style={props} className='navbar_open'>
              <div className='navbar_logo'>
                <p>Piros <br /> Photography.</p>
              </div>
              <div className='navbar_links-container'>
                <p onClick={this.goPage} className='navbar_link' value='home'>Home.</p>
                <p onClick={this.goPage} className='navbar_link' value='stories'>Stories.</p>
                <p onClick={this.goPage} className='navbar_link' value='gallery'>Gallery.</p>
                <p onClick={this.goPage} className='navbar_link' value='about'>About.</p>
              </div>
            </div>
          }
        </Spring>
        {this.state.leavePage &&
          <Spring
            from={{ transform: 'translate(100%, 0)' }}
            to={{ transform: this.state.leavePage ? 'translate(0%, 0)' : 'translate(100%, 0)' }}
            config={config.slow}
          >
            {props =>
              <div style={props} className='page-transition'></div>
            }
          </Spring>
        }
      </div>
    );
  }
}

export default withRouter(Navbar2);