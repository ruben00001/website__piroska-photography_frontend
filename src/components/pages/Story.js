import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft, faHandPointRight, faArrowAltCircleLeft, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';

class Story extends Component {
  constructor(props) {
    super(props)

    this.state = {
      titles: [],
      images: [],
      story: 0,
      currentImage: 0
    }

  }

  
  homeURL = strapiAPI;

  componentDidMount() {
    window.scrollTo(0, 0) // was a bug where page would load at bottom
  }

  nextPicture = () => {
    if(this.state.currentImage + 1 === this.props.state.images.length) {
      this.setState({
        currentImage: 0
      });
    } else {
      this.setState({
        currentImage: this.state.currentImage + 1
      })
    }
  }

  previousPicture = () => {
    if(this.state.currentImage === 0) {
      this.setState({
        currentImage: this.props.state.images.length - 1
      });
    } else {
      this.setState({
        currentImage: this.state.currentImage - 1
      })
    }
  }

  displayImage = (e) => {
      this.setState({
        currentImage: Number(e.currentTarget.getAttribute('value'))
      })
  }

  render() {
    return (
      <div className='story-page'>
        <Navigation />
        <div className='story-page_buttons'>
          <Link to='/stories'>
            <p className='story-page_buttons_button story-page_buttons_button--back'>
              <FontAwesomeIcon className='story-page_buttons_button_icon' icon={faArrowAltCircleLeft}></FontAwesomeIcon>
              Back</p>
          </Link>
          <p className='story-page_buttons_button story-page_buttons_button--previous'>
             <FontAwesomeIcon className='story-page_buttons_button_icon' icon={faHandPointLeft}></FontAwesomeIcon>
             Previous Story</p>
          <p className='story-page_buttons_button story-page_buttons_button--next'>
             Next Story
             <FontAwesomeIcon className='story-page_buttons_button_icon' icon={faHandPointRight}></FontAwesomeIcon>
             </p>
        </div>
        <h1>{this.state.titles[this.state.story]}</h1>
        <div className='story-page_main-image'>
          <img alt=''
                src={`${this.homeURL}${this.props.state.images[this.props.state.story][this.state.currentImage]}`} 
          ></img>
          <FontAwesomeIcon onClick={this.previousPicture} className='story-page_main-image_arrow story-page_main-image_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
          <FontAwesomeIcon onClick={this.nextPicture} className='story-page_main-image_arrow story-page_main-image_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
        </div>
        <div className='story-page_images'>
          { this.props.state.images[this.props.state.story].map( (imageURL, i) =>
            <div className='story-page_images_image' key={i} >
              <img onClick={this.displayImage} src={`${this.homeURL}${imageURL}`} value={i} alt=''></img>
            </div>            
          ) }
        </div>
      </div>
    )
  }
}

const StoryWithRouter = withRouter(Story);
 
export default StoryWithRouter;