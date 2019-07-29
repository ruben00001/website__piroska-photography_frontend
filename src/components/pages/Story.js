import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft, faHandPointRight, faTimesCircle, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';

class Story extends Component {
  constructor(props) {
    super(props)

    this.state = {
      story: 0,
      currentImage: 0,
      zoom: false,
      zoomedImageURL: null,
      zoomedImageKey: null,
      imageStyles: []
    }

  }

  
  homeURL = strapiAPI;

  componentDidMount() {
    window.scrollTo(0, 0) // was a bug where page would load at bottom
    this.setImageStyles(this.props.state.images[this.props.state.story]);
    
    this.setState({
      story: this.props.state.story
    });
  }

  previousStory = () => {
    if(this.state.story === 0) {
      this.setState({
        story: this.props.state.images.length - 1
      });
    } else {
      this.setState({
        story: this.state.story - 1
      })
    }
  }

  nextStory = () => {
    if(this.state.story + 1 === this.props.state.images.length) {
      this.setState({
        story: 0
      });
    } else {
      this.setState({
        story: this.state.story + 1
      })
    }
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

  setImageStyles = (images) => {
    console.log('====================================');
    console.log(images.length);
    console.log('====================================');
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
          width: `${100 - widthLeft}%`
        }
      }
      styles.push(style);
    });
    this.setState({
      imageStyles: styles
    })
  }

  test = () => {
    console.log('====================================');
    console.log(this.state.imageStyles);
    console.log('====================================');
  }

  render() {
    const story = this.state.story || this.props.state.story;

    return (
      <div className='story-page'>
        <Navigation />
        <h1 onClick={this.test}>{this.props.state.titles[story]}</h1>
        <div className='story-page_images'>
          { this.props.state.images[story].map( (imageURL, i) =>
            <div className='story-page_images_image' key={i} 
                 style={this.state.imageStyles[i]}
            >
              <img src={`${this.homeURL}${imageURL}`} value={i} alt=''
                   onClick={this.zoomOnImage}
                  //  onClick={this.displayImage}
              ></img>
            </div>            
          ) }
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
      // <div className='story-page'>
      //   <Navigation />
      //   <div className='story-page_buttons'>
      //     <Link to='/stories'>
      //       <p className='story-page_buttons_button story-page_buttons_button--back'>
      //         {/* <FontAwesomeIcon className='story-page_buttons_button_icon' icon={faArrowAltCircleLeft}></FontAwesomeIcon> */}
      //         Back</p>
      //     </Link>
      //     <p className='story-page_buttons_button story-page_buttons_button--previous'
      //        onClick={this.previousStory}>
      //        <FontAwesomeIcon className='story-page_buttons_button_icon' icon={faHandPointLeft}></FontAwesomeIcon>
      //        Previous Story</p>
      //     <p className='story-page_buttons_button story-page_buttons_button--next'
      //        onClick={this.nextStory}
      //     >Next Story
      //        <FontAwesomeIcon className='story-page_buttons_button_icon' icon={faHandPointRight}></FontAwesomeIcon>
      //        </p>
      //   </div>
      //   <h1>{this.props.state.titles[story]}</h1>
      //   <div className='story-page_main-image'>
      //     <img alt=''
      //           src={`${this.homeURL}${this.props.state.images[story][this.state.currentImage]}`} 
      //     ></img>
      //     <FontAwesomeIcon onClick={this.previousPicture} className='story-page_main-image_arrow story-page_main-image_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
      //     <FontAwesomeIcon onClick={this.nextPicture} className='story-page_main-image_arrow story-page_main-image_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
      //   </div>
      //   <div className='story-page_images'>
      //     { this.props.state.images[story].map( (imageURL, i) =>
      //       <div className='story-page_images_image' key={i} >
      //         <img src={`${this.homeURL}${imageURL}`} value={i} alt=''
      //              onClick={this.zoomOnImage}
      //             //  onClick={this.displayImage}
      //         ></img>
      //       </div>            
      //     ) }
      //   </div>
      //   { this.state.zoom && 
      //       <div className='gallery-page_zoom-image'>
      //         <div className='gallery-page_zoom-image_image'>
      //           <img src={this.state.zoomedImageURL} alt=''></img>
      //           <FontAwesomeIcon onClick={this.previousPicture} className='gallery-page_zoom-image_arrow gallery-page_zoom-image_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
      //           <FontAwesomeIcon onClick={this.nextPicture} className='gallery-page_zoom-image_arrow gallery-page_zoom-image_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
      //           <FontAwesomeIcon onClick={this.exitZoom} className='gallery-page_zoom-image_x' icon={faTimesCircle}></FontAwesomeIcon>
      //         </div>
      //       </div>
      //     }
      // </div>
    )
  }
}

const StoryWithRouter = withRouter(Story);
 
export default StoryWithRouter;

  // nextPicture = () => {
  //   if(this.state.currentImage + 1 === this.props.state.images.length) {
  //     this.setState({
  //       currentImage: 0
  //     });
  //   } else {
  //     this.setState({
  //       currentImage: this.state.currentImage + 1
  //     })
  //   }
  // }

  // previousPicture = () => {
  //   if(this.state.currentImage === 0) {
  //     this.setState({
  //       currentImage: this.props.state.images.length - 1
  //     });
  //   } else {
  //     this.setState({
  //       currentImage: this.state.currentImage - 1
  //     })
  //   }
  // }