import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';

class Story extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentImage: 0
    }

    this.goBack = this.goBack.bind(this)
  }

  
  homeURL = strapiAPI;

  componentDidMount() {
    this.setState({
      mainImage: this.props.imageURLs[0]
    })
    window.scrollTo(0, 0) // was a bug where page would load at bottom
  }

  nextPicture = () => {
    if(this.state.currentImage + 1 === this.props.imageURLs.length) {
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
        currentImage: this.props.imageURLs.length - 1
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

  goBack = () => {
    this.props.history.goBack();
  }

    render() {
      return (
        <div className='story-page'>
          <Navbar navClass='navbar navbar--stories' iconClass='navbar_index-button_icon navbar_index-button_icon--stories' navTextClass='navbar_index-button_text navbar_index-button_text--stories' />
          <p className='story-page_back' onClick={ this.props.history.goBack }><FontAwesomeIcon className='story-page_back_icon' icon={faAngleLeft}></FontAwesomeIcon>Back to stories</p>
          <h1>{this.props.title}</h1>
          <div className='story-page_main-image'>
            <img src={`${this.homeURL}${this.props.imageURLs[this.state.currentImage]}`} alt=''></img>
            <FontAwesomeIcon onClick={this.previousPicture} className='story-page_main-image_arrow story-page_main-image_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
            <FontAwesomeIcon onClick={this.nextPicture} className='story-page_main-image_arrow story-page_main-image_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
          </div>
          <div className='story-page_images'>
            { this.props.imageURLs.map( (imageURL, index) =>
              <div className='story-page_images_image' key={index} >
                <img onClick={this.displayImage} src={`${this.homeURL}${imageURL}`} value={index} alt=''></img>
              </div>            
            ) }
          </div>
  
        </div>
      )
    }
}

const StoryWithRouter = withRouter(Story);
 
export default StoryWithRouter;