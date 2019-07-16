import React, { Component } from 'react';
import Axios from 'axios';
import Navbar from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';

class Home extends Component {
    constructor(props) {
      super(props)

      this.state = {
        image: null
      }
    }

    homeURL = strapiAPI;

    componentDidMount() {
      Axios.get(`${this.homeURL}/homes`)
        .then(response => {

          this.setState({
            image: response.data[0].image.url
          })
      })
    }

  
    render() {    
      return (
        <div className='home-container'>
          <Navbar navClass='navbar navbar--home' iconClass='navbar_index-button_icon navbar_index-button_icon--home' navTextClass='navbar_index-button_text' />
          <div className='home-banner'>
            <div className='home-banner_image'>
              <img src={`${this.homeURL}${this.state.image}`} alt=''></img>
              <h1 className='home-banner_title'>Piroska Markus</h1>
              <h1 className='home-banner_title home-banner_title--2'>Piroska Markus</h1>
              <h1 className='home-banner_title home-banner_title--photo'>Photography</h1>
              <h1 className='home-banner_title home-banner_title--photo home-banner_title--photo--2'>Photography</h1>
            </div>
          </div>
        </div>
      )
    }
  }

  export default Home;