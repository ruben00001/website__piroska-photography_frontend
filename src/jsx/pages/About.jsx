import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../layout/navbar/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { strapiAPI } from '../../environment/strapi-api';
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
            <Navbar
              white={true}
            />
            <div className='about_image'>
              <img src={require('../../img/PeopleInRain.jpg')} alt=''
                onLoad={_ => this.setState({ imageLoaded: true })}
              ></img>
            </div>
            <div className='about_container'>
              <div className='about_info'>
                <p className='about_info_email'>pirospixs<span className='about_info_at'>@</span>gmail.com</p>
                <div className='about_info_link'>
                  <p>facebook</p>
                  <FontAwesomeIcon className='about_info_link_arrow' icon={faLongArrowAltRight}></FontAwesomeIcon>
                  <a href='https://www.facebook.com/SeeInPictures/' target='_blank' rel="noopener noreferrer"><p><span className='about_info_at'>@</span>seeinpictures</p></a>
                </div>
                <div className='about_info_link about_info_link--youtube'>
                  <p>youtube</p>
                  <FontAwesomeIcon className='about_info_link_arrow' icon={faLongArrowAltRight}></FontAwesomeIcon>
                  <a href='https://www.youtube.com/playlist?list=PLdAjHO5OZG7y9CGvEG3Cf3ZgcaCL_p9fZ ' target='_blank' rel="noopener noreferrer"><p><span className='about_info_at'>@</span>piroska markus</p></a>
                </div>
              </div>
              <div className='about_personal'>
                <p className='about_personal_description'>piroska markus lives in london and <br />is originally from budapest. <br />In her photgraphy she tries to capture <br />beauty and ugliness in all its forms. <br /><br />She has worked in many organisations <br /> in the UK for the last thirty years<br />  supporting vulnerable people - <br />including homeless people, <br /> adults with learning and physical disabilities<br /> and people who were abused as children. <br /><br /> She is active in political and social movements<br /> and wants to see how people live <br /> in different parts of the world. <br />She  left her job in September <span>2019</span><br /> to travel to Central and South America. <br /><br /> She has three amazing grown up children <br /> whom she considers her biggest achievements. <br/>She occasionally writes political essays and novels. <br />Her writings have been published <br />in a number of countries.</p>
              </div>
            </div>
          </div>
        }
      </Spring>

    );
  }
}

export default About;