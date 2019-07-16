import React, { Component } from 'react';
import Navbar from '../layout/Navbar';

class Home extends Component {
    constructor(props) {
      super(props)

      this.state = {
        mainImage: null,
        bannerStyle: {
          backgroundImage: null,
        },
        featuredEssay1: {},
        featuredEssay2: {},
        shortStories: [],
        images: null,
        essaysSeeAll: false,
        shortsSeeAll: false,
        gallerySeeAll: false
      }
    }
  
    render() {    
      return (
        <div className='home-container'>
          <Navbar navClass='navbar navbar--home' iconClass='navbar_index-button_icon navbar_index-button_icon--home' navTextClass='navbar_index-button_text' />
          <div className='home-banner'>
            <div className='home-banner_image'>
              <img src={require('../../img/Theatre against dictatorship.jpg')} alt=''></img>
              <h1 className='home-banner_title'>Piroska Markus</h1>
              <h1 className='home-banner_title home-banner_title--2'>Piroska Markus</h1>
              <h1 className='home-banner_title home-banner_title--3'>Piro</h1>
              <h1 className='home-banner_title home-banner_title--photo'>Photography</h1>
              <h1 className='home-banner_title home-banner_title--photo home-banner_title--photo--2'>Photography</h1>
            </div>
          </div>
        </div>
      )
    }
  }

  export default Home;