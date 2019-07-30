import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimesCircle, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';

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
    }

  }

  
  homeURL = strapiAPI;

  componentDidMount() {
    window.scrollTo(0, 0) // a bug where page loads to bottom
    this.setImageContainerStyles(this.props.state.images[this.props.state.story]);
    this.setState({
      story: this.props.state.story
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


  story = 0; // declaration saves writing

  nextPicture = () => {
    if(this.state.zoomedImageKey + 1 === this.props.state.images[this.story].length) {
      this.setState({
        zoomedImageURL: `${this.homeURL}${this.props.state.images[this.story][0]}`,
        zoomedImageKey: 0
      });
    } else {
      this.setState({
        zoomedImageURL: `${this.homeURL}${this.props.state.images[this.story][this.state.zoomedImageKey + 1]}`,
        zoomedImageKey: this.state.zoomedImageKey + 1
      })
    }
  }

  previousPicture = () => {
    if(this.state.zoomedImageKey === 0) {
      this.setState({
        zoomedImageURL: `${this.homeURL}${this.props.state.images[this.story][this.props.state.images[this.story].length - 1]}`,
        zoomedImageKey: this.props.state.images[this.story].length - 1
      });
    } else {
      this.setState({
        zoomedImageURL: `${this.homeURL}${this.props.state.images[this.story][this.state.zoomedImageKey - 1]}`,
        zoomedImageKey: this.state.zoomedImageKey - 1
      });
    }
  }

  rdmNum = (x, y) => {
    return x + Math.random() * (y - x);
  }

  setImageContainerStyles = (images) => {
    let style = {};
    let styles = [];
    let widthLeft = 0;
    images.forEach( (image, i) => {
      if (i===0) style = { width: '100%' }
      else if (i % 2 != 0) {
        widthLeft = this.rdmNum(40, 60)
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
    this.setState({
      imageContainerStyles: styles
    })
  }

  // setNextStory = () => {
  //   console.log(this.state.story, this.props.state.images.length);
    
  //   if(this.state.story + 1 === this.props.state.images.length) {
  //     this.setState({
  //       nextStory: 0
  //     });
  //   } else {
  //     this.setState({
  //       nextStory: this.state.story + 1
  //     })
  //   }
  // }

  goToNextStory = () => {
    console.log(this.state.story);
    this.props.state.images[this.state.story + 1] ? this.setState({ story: this.state.story + 1}) : this.setState({ story: 0})
    
    // if(this.state.story + 1 === this.props.state.images.length) {
    //   this.setState({
    //     story: 0
    //   }, () => {console.log(this.state.story)});
    // } else {
    //   this.setState({
    //     story: this.state.story + 1
    //   }, () => {console.log(this.state.story)})
    // }
    window.scrollTo(0, 0)
    // this.setNextStory()
  }


  test = () => {
    console.log('====================================');
    console.log(this.state.imageContainerStyles);
    console.log('====================================');
  }

  render() {
    const story = this.state.story;

    return (
      <div className='story-page'>
        <Navigation />
        <h1 onClick={this.test}>{this.props.state.titles[story]}</h1>
        <div className='story-page_images'>
          { this.props.state.images[story].map( (imageURL, i) =>
            <div className={`story-page_images_image story-page_images_image--${i}`} key={i} 
                 style={this.state.imageContainerStyles[i]}
            >
              <img src={`${this.homeURL}${imageURL}`} value={i} alt=''
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
                onClick={this.goToNextStory}
                >View collection
                <FontAwesomeIcon className='story-page_next-story_info_view_icon' icon={faArrowRight}></FontAwesomeIcon>
              </p>
            </div>
            <div className='story-page_next-story_image'>
              <img alt=''
                src={`${this.homeURL}${this.props.state.mainImage[story + 1] || this.props.state.mainImage[0]}`}
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
                <FontAwesomeIcon onClick={this.exitZoom} className='gallery-page_zoom-image_x' icon={faTimesCircle}></FontAwesomeIcon>
              </div>
            </div>
          }
      </div>
    )
  }
}

const StoryWithRouter = withRouter(Story);
 
export default StoryWithRouter;
