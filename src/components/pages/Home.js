import React, { Component } from 'react';
import Axios from 'axios';
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';
import {Spring, config} from 'react-spring/renderprops';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import LoadingScreen from './Loading';
import CountUp from 'react-countup';
import Counter from './Counter';

class Home extends Component {
    constructor(props) {
      super(props)

      this.state = {
        image: null,
        piroska: 'white',
        photography: 'white',
        imageLoaded: false,
        showPage: false,
        changeBackground: false,
        scalePage: false,
        timerDuration: 30
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
        timerDuration: 1
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
      }, 600)
    }

    render() {
      let title1Style = {};
      let title2Style = {};

      let gradient = 0;
      if( window.innerWidth > 1024) gradient = 20.9;
      if( window.innerWidth <= 1024) gradient = 14.13;

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
            <Spring
              from={{ backgroundColor: 'black' }}
              to={{ backgroundColor: !this.state.changeBackground ? 'black' : '#3f3f3f' }}
              config={{ duration: 100 }}
              >
              {props => 
                <div style={props} className='loading-screen'>
                  <CountUp className='countup' 
                    end={100}
                    duration={this.state.timerDuration} 
                    useEasing={false}
                  />
                </div>  
              }
            </Spring>
        
            { this.state.showPage && 
              <Navigation />
            }        
            <Spring
              from={{ opacity: 0, transform: 'scale(0.8)' }}
              to={{ opacity: !this.state.showPage ? 0 : 1, transform: !this.state.imageLoaded ? 'scale(0.8)' : 'scale(1)'  }}
              config={ config.slow }
              >
              {props => 
                <div style={props} className='home_main-container'>
                  <div className='home_image'>
                    <img onLoad={this.onImageLoad} src={`${this.state.image}`} alt=''></img>
                    <h1 className='home_title' 
                      style={title1Style}>
                        Piroska Markus</h1>
                    <h1 className='home_title home_title--2'>Piroska Markus</h1>
                    <h1 className='home_title home_title--photo'
                      style={title2Style}>
                        Photography</h1>
                  </div>
                </div>
              }
            </Spring>
          </div>

      )
    }
  }

  export default Home;


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