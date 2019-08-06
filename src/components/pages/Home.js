import React, { Component } from 'react';
import Axios from 'axios';
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';
import {Spring} from 'react-spring/renderprops';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LoadingScreen from './Loading';
import LoadingWidget from './LoadingWidget';

class Home extends Component {
    constructor(props) {
      super(props)

      this.state = {
        image: null,
        piroska: 'white',
        photography: 'white',
        imageLoaded: false,
        opacity: 0,
        progress: 0,
        progressIncrement: 1
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
      this.progressBar()      
    }

    homeURL = strapiAPI;

    progressBar = () => {
      setInterval(_ => {
        this.setState({
          progress: this.state.progress + this.state.progressIncrement
        })
      }, 100)
    }

    onImageLoad = () => {
      this.setState({
        progressIncrement: (100 - this.state.progress) / 10,
        imageLoaded: true
      })
      setTimeout(_ => {
        this.setState({
          opacity: 1,
          progressIncrement: 0
        })
      }, 1500)
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
            from={{ opacity: 1 }}
            to={{ opacity: !this.state.imageLoaded ? 1 : 0 }}
            config={{ duration: 2000 }}
          >
            {props =>
              <ProgressBar style={props} now={this.state.progress}/>
            }
          </Spring>
          { this.state.opacity && 
            <Navigation />
          }
          
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: this.state.opacity }}
            config={{ duration: 1000 }}
            >
            {propsB => 
              <div style={propsB} className='home_main-container'>
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


