import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';
import {Spring, config} from 'react-spring/renderprops';
import CountUp from 'react-countup';

class Story extends Component {
  constructor(props) {
    super(props)

    this.state = {
      story: 0,
      nextStory: 0,
      currentImage: 0,
      zoom: false,
      zoomedImageURL: null,
      zoomedImageKey: null,
      imageContainerStyles: [],
      nextStoryStyle: {opacity: 0.5},
      numImages: 0,
      numImagesLoaded: 0,
      imagesLoaded: false
    }

  }
  
  homeURL = strapiAPI;

  componentDidMount() {
    window.scrollTo(0, 0) // a bug where page loads to bottom
    this.setImageContainerStyles(this.props.state.images[this.props.state.story]);
    this.setState({
      story: this.props.state.story,
      numImages: this.props.state.images[this.props.state.story].length
    })
  }

  setImageContainerStyles = (images) => {
    let style = {};
    let styles = [];
    let widthLeft = 0;
    if (window.innerWidth < 600) {
      images.forEach( _ => {
        style = {
          width: '100%'
        }
        styles.push(style);
      });
    } else {
      images.forEach( (image, i) => {
        if (i % 2 === 0) {
          widthLeft = this.rdmNum(35, 65)
          style = {
            float: 'left',
            width: `${widthLeft}%`
          }
        } else {
          style = {
            float: 'right',
            width: `${100 - widthLeft}%`,
            textAlign: 'right'
          }
        }
        styles.push(style);
      });
    }

    this.setState({
      imageContainerStyles: styles
    })
  }

  displayImage = (e) => {
      this.setState({
        currentImage: Number(e.currentTarget.getAttribute('value'))
      })
  }

  zoomOnImage = (e) => {
    this.setState({
      zoomedImageURL: e.currentTarget.src,
      zoom: true,
      zoomedImageKey: Number(e.currentTarget.getAttribute('value'))
    });
    this.story = this.state.story; 
  }

  exitZoom = () => {
    this.setState({
      zoom: false
    })
  }

  story = 0; // declaration saves writing. Set to be this.state.story above

  nextPicture = () => {
    if(this.state.zoomedImageKey + 1 === this.props.state.images[this.story].length) {
      this.setState({
        zoomedImageURL: `${this.props.state.images[this.story][0]}`,
        zoomedImageKey: 0
      });
    } else {
      this.setState({
        zoomedImageURL: `${this.props.state.images[this.story][this.state.zoomedImageKey + 1]}`,
        zoomedImageKey: this.state.zoomedImageKey + 1
      })
    }
  }

  previousPicture = () => {
    if(this.state.zoomedImageKey === 0) {
      this.setState({
        zoomedImageURL: `${this.props.state.images[this.story][this.props.state.images[this.story].length - 1]}`,
        zoomedImageKey: this.props.state.images[this.story].length - 1
      });
    } else {
      this.setState({
        zoomedImageURL: `${this.props.state.images[this.story][this.state.zoomedImageKey - 1]}`,
        zoomedImageKey: this.state.zoomedImageKey - 1
      });
    }
  }

  rdmNum = (x, y) => {
    return x + Math.random() * (y - x);
  }

  goToNextStory = () => {
    this.props.state.images[this.state.story + 1] ? this.setState({ story: this.state.story + 1}) : this.setState({ story: 0})
    window.scrollTo(0, 0)
  }

  nextStoryStyle = () => {
    this.state.nextStoryStyle.opacity === 0.5 ? this.setState({ nextStoryStyle: {opacity: 1} }) : this.setState({ nextStoryStyle: {opacity: 0.5} })
  }

  imagesOnLoad = () => {
    this.setState({
        numImagesLoaded: this.state.numImagesLoaded + 1,
    }, _ => {
        if(this.state.numImagesLoaded === this.state.numImages) {
            setTimeout(() => {
                this.setState({
                    imagesLoaded: true
                })
            }, 1000);
        }
    })
  }

  render() {
    const story = this.state.story;

    return (
      <div className='story-page'>
        <Spring
          from={{ backgroundColor: 'white', opacity: 1, zIndex: 1 }}
          to={{ opacity: !this.state.imagesLoaded ? 1 : 0, zIndex: !this.state.imagesLoaded ? 1 : -1 }}
          config={ config.mollases }
          >
          {props => 
              <div style={props} className='loading-screen'>
                  <CountUp className='counter counter--stories' 
                      end={100}
                      duration={10} 
                      useEasing={false}
                      onEnd={({ start }) => start()}
                  />
              </div>  
          }
        </Spring>
        <div className='story-page_main-container'>
        { this.state.imagesLoaded && 
          <Navigation />
        }
        <h1 onClick={this.test}>{this.props.state.titles[story]}</h1>
        <div className='story-page_images'>
          { this.props.state.images[story].map( (imageURL, i) =>
            <div className={`story-page_images_image story-page_images_image--${i}`} key={i} 
                 style={this.state.imageContainerStyles[i]}
            >
              <img src={`${imageURL}`} value={i} alt=''
                onLoad={this.imagesOnLoad}
                onClick={this.zoomOnImage}
              ></img>
            </div>            
          ) }
        </div>
        <div className='story-page_next-story'>
          <div className='story-page_next-story_container'>
            <div className='story-page_next-story_info'>
              <p className='story-page_next-story_info_next'>NEXT</p>
              <p className='story-page_next-story_info_name'>
                {`${this.props.state.titles[story + 1] || this.props.state.titles[0]}`}
              </p>
              <p className='story-page_next-story_info_view'
                onMouseEnter={this.nextStoryStyle}
                onMouseLeave={this.nextStoryStyle}
                onClick={this.goToNextStory}
                >View collection
                <FontAwesomeIcon className='story-page_next-story_info_view_icon' icon={faArrowRight}></FontAwesomeIcon>
              </p>
            </div>
            <div className='story-page_next-story_image'>
              <img alt=''
                src={`${this.props.state.mainImage[story + 1] || this.props.state.mainImage[0]}`} 
                style={this.state.nextStoryStyle}
                onMouseEnter={this.nextStoryStyle}
                onMouseLeave={this.nextStoryStyle}
                onClick={this.goToNextStory}
                >
                </img>
            </div>
          </div>
        </div>
        { this.state.zoom && 
            <div className='gallery-page_zoom-image'>
              <div className='gallery-page_zoom-image_image'>
                <img src={this.state.zoomedImageURL} alt=''></img>
                <FontAwesomeIcon onClick={this.previousPicture} className='gallery-page_zoom-image_arrow gallery-page_zoom-image_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
                <FontAwesomeIcon onClick={this.nextPicture} className='gallery-page_zoom-image_arrow gallery-page_zoom-image_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
                <FontAwesomeIcon onClick={this.exitZoom} className='gallery-page_zoom-image_x' icon={faTimes}></FontAwesomeIcon>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

const StoryWithRouter = withRouter(Story);
 
export default StoryWithRouter;
