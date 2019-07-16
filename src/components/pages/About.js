import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';

class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      picture: null,
      description: null
    }
  }


  componentDidMount() {
    axios.get(`${this.homeURL}/abouts`)
    .then(response => {
      this.setState({
        picture: response.data[0].picture.url,
        description: response.data[0].description
      });
    });
  }

  homeURL = strapiAPI;

  render() {
    return ( 
      <div className='about'>
        <Navbar navClass='navbar navbar--stories' iconClass='navbar_index-button_icon navbar_index-button_icon--stories' navTextClass='navbar_index-button_text navbar_index-button_text--stories' />
        <div className='about_container'>
          <div className='about_info'>
            <img src={`${this.homeURL}${this.state.picture}`} alt=''></img>
            <div className='about_info_text'>
              <p>{this.state.description}</p>  
              <div className='about_links'>
                <p>Email: piros.cards@gmail.com</p>
                <a href='https://www.facebook.com/SeeInPictures/' target='_blank' rel="noopener noreferrer"><p >Facebook</p></a>  
              </div>  
            </div>
          </div>
        </div>  
      </div>
    );
  }
}
 
export default About;