import React, { Component } from 'react';
import axios from 'axios';
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';

class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      picture: null,
      description: null
    }
  }

  homeURL = strapiAPI;

  componentDidMount() {
    axios.get(`${this.homeURL}/abouts`)
    .then(response => {
      this.setState({
        picture: response.data[0].picture.url,
        description: response.data[0].description
      });
    });
  }

  render() {
    return ( 
      <div className='about'>
        <Navigation />
        <div className='about_container'>
          <div className='about_image'>
            <img src={`${this.homeURL}${this.state.picture}`} alt=''></img>
          </div>
          <div className='about_info'>
            <p className='about_info_text'>{this.state.description}</p>  
            <div className='about_info_links'>
              <p>Email: piros.cards@gmail.com</p>
              <a href='https://www.facebook.com/SeeInPictures/' target='_blank' rel="noopener noreferrer"><p >Facebook</p></a>  
            </div>  
          </div>
        </div> 
      </div>
    );
  }
}
 
export default About;