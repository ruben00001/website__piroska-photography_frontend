import React, { Component } from 'react';
import Axios from 'axios';
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';

class Home extends Component {
    constructor(props) {
      super(props)

      this.state = {
        image: null,
        piroska: 'white',
        photography: 'white',
        imageLoaded: false
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
        imageLoaded: true
      })
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

      let loadingStyle = {};
      if( this.state.imageLoaded === true ) loadingStyle = { backgroundColor: 'transparent' }

      return (
        <div className='home'>

          <div style={loadingStyle} className='loading-screen'></div>
          
          { this.state.imageLoaded && 
            <Navigation />
          }
          <div className='home_main-container'>
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
        </div>

      )
    }
  }

  export default Home;