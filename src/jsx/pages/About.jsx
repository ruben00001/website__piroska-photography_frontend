import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../components/Logo';
import Navbar2 from '../layout/navbar/Navbar2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { strapiAPI } from '../../enviroment/strapi-api';
import { Spring, config } from 'react-spring/renderprops';

class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      picture: null,
      description: null,
      imageLoaded: false
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
      <Spring
        from={{ opacity: 0 }}
        to={{
          opacity: this.state.imageLoaded ? 1 : 0
        }}
        config={config.slow}
      >
        {props =>
          <div style={props} className='about'>
            {/* <Logo /> */}
            <Navbar2
              white={true}
            />
            <div className='about_image'>
              <img src={require('../../img/PeopleInRain.jpg')} alt=''
                onLoad={_ => this.setState({ imageLoaded: true })}
              ></img>
            </div>
            <div className='about_container'>
              <div className='about_info'>
                <p className='about_info_email'>piros.cards<span className='about_info_at'>@</span>gmail.com</p>
                <div className='about_info_facebook'>
                  <p>facebook</p>
                  <FontAwesomeIcon className='about_info_facebook_arrow' icon={faLongArrowAltRight}></FontAwesomeIcon>
                  <a href='https://www.facebook.com/SeeInPictures/' target='_blank' rel="noopener noreferrer"><p ><span className='about_info_at'>@</span>seeinpictures</p></a>
                </div>
              </div>
              <div className='about_personal'>
                <p className='about_personal_description'>piroska markus lives in london, <br />is originally from budapest <br /> and soon to travel across the world.<br /><br />In her photgraphy she tries to capture <br />beauty in all its forms. <br /><br />She has three children,<br /> loves her home in Abbey Wood <br /> and enjoys taking long walks.<br /><br />get in touch.</p>
              </div>
            </div>
          </div>
        }
      </Spring>

    );
  }
}

export default About;