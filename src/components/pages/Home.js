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

      const title1Style = {
        backgroundImage: this.state.piroska === 'white' ? 
        `linear-gradient(to right, #3f3f3f 21%, white 21%, white 100%)` : 
        `linear-gradient(to right, #3f3f3f 21%, #3f3f3f 21%, #3f3f3f 100%)`
      }

      const title2Style = {
        backgroundImage: this.state.photography === 'white' ? 
        `linear-gradient(to right, transparent 20.8%, white 20.8%, white 100%)` : 
        `linear-gradient(to right, transparent 20.8%, #3f3f3f 20.8%, #3f3f3f 100%)`
      }

      return (
        <div className='home-container'>
          <Navigation />
          <div className='home-banner'>
            <div className='home-banner_image'>
              <img src={`${this.homeURL}${this.state.image}`} alt=''></img>
              <h1 className='home-banner_title' 
                  style={title1Style}>
                    Piroska Markus</h1>
              <h1 className='home-banner_title home-banner_title--2'>Piroska Markus</h1>
              <h1 className='home-banner_title home-banner_title--photo'>Photography</h1>
              <h1 className='home-banner_title home-banner_title--photo home-banner_title--photo--2'
                  style={title2Style}>
                    Photography</h1>
            </div>
          </div>
        </div>
      )
    }
  }

  export default Home;