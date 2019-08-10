import React, { Component } from 'react';
import Axios from 'axios';
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';
import { Spring, config } from 'react-spring/renderprops';
import { withRouter } from 'react-router';
import CountUp from 'react-countup';
import Navbar2 from '../layout/Navbar2'


class Home extends Component {
  constructor(props) {
    super(props);

    this.page = React.createRef();

    this.state = {
      image: null,
      piroska: 'white',
      photography: 'white',
      imageLoaded: false,
      showPage: false,
      changeBackground: false,
      scalePage: false,
      timerDuration: 20,
      showLoadingText: 0,
      leaveAnimation: false,
      changeLeaveColor: false,
      menuOpen: false,
      openNav: false
    }
  }

  componentDidMount() {
    Axios.get(`${this.homeURL}/homes`)
      .then(response => {
        this.setState({
          image: response.data[0].image.url,
          piroska: response.data[0].piroska,
          photography: response.data[0].photography
        })
      })
  }

  homeURL = strapiAPI;

  onImageLoad = () => {
    this.setState({
      imageLoaded: true,
      timerDuration: 5
    })
    setTimeout(_ => {
      this.setState({
        changeBackground: true
      })
    }, 100)
    setTimeout(_ => {
      this.setState({
        showPage: true
      })
    }, 350)
    setTimeout(_ => {
      this.setState({
        scalePage: true,
      })
    }, 550)
  }

  changeMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  toggleNav = () => {
    this.setState({
      openNav: !this.state.openNav
    });
  }

  goPage = (e) => {
    let route = `/${e.currentTarget.getAttribute('value')}`;
    this.setState({
      leaveAnimation: true
    }, _ => {
      setTimeout(() => {
        this.setState({
          changeLeaveColor: true
        })
      }, 1000);
      setTimeout(() => {
        this.props.history.push(route)
      }, 2200);
    })
  }


  test = () => {

  }



  render() {
    let title1Style = {};
    let title2Style = {};

    let gradient = 0;
    if (window.innerWidth > 1024) gradient = 20.9;
    if (window.innerWidth <= 1024) gradient = 14.13;

    title1Style = {
      backgroundImage: this.state.piroska === 'white' ?
        `linear-gradient(to right, #3f3f3f ${gradient}%, white ${gradient}%, white 100%)` :
        `linear-gradient(to right, #3f3f3f ${gradient}%, #3f3f3f ${gradient}%, #3f3f3f 100%)`
    }
    title2Style = {
      backgroundImage: this.state.photography === 'white' ?
        `linear-gradient(to right, #3f3f3f ${gradient}%, white ${gradient}%, white 100%)` :
        `linear-gradient(to right, #3f3f3f ${gradient}%, #3f3f3f ${gradient}%, #3f3f3f 100%)`
    }

    return (
      <div className='home'>
        <Navbar2 />
        {/* <Spring
          from={{ backgroundColor: '#050505' }}
          to={{ backgroundColor: !this.state.changeBackground ? '#050505' : '#222222' }}
          config={{ duration: 100 }}
        >
          {props =>
            <div style={props} className='loading-screen'>
              {!this.state.changeBackground &&
                <div className='counter-container'>
                  <CountUp className='counter counter--home'
                    end={100}
                    duration={this.state.timerDuration}
                    useEasing={false}
                    onEnd={({ start }) => {
                      start();
                      this.setState({ showLoadingText: 1 }, () => setTimeout(() => {
                        this.setState({
                          showLoadingText: 0
                        })
                      }, 800))
                    }}
                  />
                  <Spring
                    from={{ opacity: 0 }}
                    to={{ opacity: this.state.showLoadingText }}
                  >
                    {propsB =>
                      <p style={propsB}>Loading</p>
                    }

                  </Spring>
                </div>
              }
            </div>
          }
        </Spring> */}
        {/* <Navigation /> */}
        
        {/* {this.state.showPage &&
          <Navigation
            // toggleNav={ this.toggleNav }
            // openNav={ this.state.openNav }
          // menuOpen={ this.state.menuOpen }
          // changeMenu={ this.changeMenu }
          // goHome={ this.goPage }
          // goStories={ this.goPage }
          // goGallery={ this.goPage }
          // goAbout={ this.goPage }
          />
        } */}
        <Spring
          from={{ opacity: 0, transform: 'scale(0.85)' }}
          to={{ opacity: !this.state.showPage ? 0 : 1, transform: !this.state.scalePage ? 'scale(0.85)' : 'scale(1)' }}
          config={config.slow}
        >
          {props =>
            <div style={props} className='home_main-container'>
              <div className='home_image'>
                <img onLoad={this.onImageLoad} src={`${this.state.image}`} alt=''></img>
                <h1 className='home_title'
                  style={title1Style}
                >
                  Piros</h1>
                <h1 onClick={this.test} className='home_title home_title--2'>Piros</h1>
                <h1 className='home_title home_title--photo'
                  style={title2Style}>
                  Photography</h1>
              </div>
            </div>
          }
        </Spring>
        {this.state.leaveAnimation &&
          <Spring
            from={{ transform: 'translate(100%, 0)' }}
            to={{ transform: this.state.leaveAnimation ? 'translate(0%, 0)' : 'translate(100%, 0)' }}
            config={config.slow}
          >
            {props =>
              <div style={props} className='leave-page--home'></div>
            }
          </Spring>
        }
        {this.state.changeLeaveColor &&
          <Spring
            from={{ transform: 'translate(100%, 0)' }}
            to={{ transform: this.state.changeLeaveColor ? 'translate(0%, 0)' : 'translate(100%, 0)' }}
            config={{ mass: 1, tension: 280, friction: 50 }}
          >
            {props =>
              <div style={props} className='leave-page--home leave-page--home--2'>
                <div className='counter counter--stories'>
                  0
                </div>
              </div>
            }
          </Spring>
        }
      </div>
    )
  }
}

export default withRouter(Home);


//   <Spring
//   from={{ opacity: 1 }}
//   to={{ opacity: !this.state.imageLoaded ? 1 : 0 }}
//   config={{ duration: 2000 }}
// >
//   {props =>
//     <ProgressBar style={props} now={this.state.progress}/>
//   }
// </Spring>

// <div className='home_main-container'>
// <div className='home_image'>
//   <img onLoad={this.onImageLoad} src={`${this.state.image}`} alt=''></img>
//   <h1 className='home_title' 
//     style={title1Style}>
//       Piroska Markus</h1>
//   <h1 className='home_title home_title--2'>Piroska Markus</h1>
//   <h1 className='home_title home_title--photo'
//     style={title2Style}>
//       Photography</h1>
// </div>
// </div>