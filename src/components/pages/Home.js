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
        photography: 'white'
      }
    }

    homeURL = strapiAPI;

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

    render() {
      let titleStyle = {};

      let gradient = 0;
      if( window.innerWidth > 1024) gradient = 20.9;
      if( window.innerWidth <= 1024) gradient = 14.13;
      // if( window.innerWidth < 1024) gradient = 14.51;

      titleStyle = {
        backgroundImage: this.state.piroska === 'white' ? 
        `linear-gradient(to right, #3f3f3f ${gradient}%, white ${gradient}%, white 100%)` : 
        `linear-gradient(to right, #3f3f3f ${gradient}%, #3f3f3f ${gradient}%, #3f3f3f 100%)`
      }

      return (
        <div className='home'>
          <Navigation />
          <div className='home_main-container'>
            <div className='home_image'>
              <img src={`${this.state.image}`} alt=''></img>
              <h1 className='home_title' 
                style={titleStyle}>
                  Piroska Markus</h1>
              <h1 className='home_title home_title--2'>Piroska Markus</h1>
              <h1 className='home_title home_title--photo'
                style={titleStyle}>
                  Photography</h1>
            </div>
          </div>
        </div>

      )
    }
  }

  export default Home;