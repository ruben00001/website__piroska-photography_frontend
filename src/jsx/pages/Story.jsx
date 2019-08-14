import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Navbar2 from '../layout/navbar/Navbar2';
import { strapiAPI } from '../../enviroment/strapi-api';
import { Spring, config } from 'react-spring/renderprops';
import Zoom from '../components/Zoom';
import LoadingScreen from '../components/Loading-screen';

class Story extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zoom: false,
      zoomedImageURL: null,
      zoomedImageKey: null,
      imageContainerStyles: [],
      nextStoryStyle: { opacity: 0.5 },
      numImagesLoaded: 0,
      imagesLoaded: false,
      loadingWidgetOut: false,
      stopLoader: false,
      titlesIn: false
    }

  }

  homeURL = strapiAPI;

  componentDidMount() {
    window.scrollTo(0, 0) // a bug where page loads to bottom
    this.setImageContainerStyles(this.props.images);
  }

  setImageContainerStyles = (images) => {
    let style = {};
    let styles = [];
    let widthLeft = 0;
    if (window.innerWidth < 600) {
      images.forEach(_ => {
        style = {
          width: '100%'
        }
        styles.push(style);
      });
    } else {
      images.forEach((image, i) => {
        if (i % 2 === 0) {
          widthLeft = this.rdmNum(35, 65)
          style = {
            width: `${widthLeft}%`
          }
        } else {
          style = {
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

  imagesOnLoad = () => {
    this.setState({
      numImagesLoaded: this.state.numImagesLoaded + 1,
    }, _ => {
      if (this.state.numImagesLoaded === this.props.images.length) {
        setTimeout(() => {
          this.setState({
            imagesLoaded: true
          })
        }, 350);
        setTimeout(_ => {
          this.setState({
            stopLoader: true
          })
        }, 900);
        setTimeout(_ => {
          this.setState({
            loadingWidgetOut: true
          })
        }, 1300);
        setTimeout(_ => {
          this.setState({
            titlesIn: true
          })
        }, 2000);
      }
    })
  }

  zoomOnImage = (e) => {
    this.setState({
      zoomedImageURL: e.currentTarget.src,
      zoom: true,
      zoomedImageKey: Number(e.currentTarget.getAttribute('value'))
    });
  }

  exitZoom = () => {
    this.setState({
      zoom: false
    })
  }

  // story = 0; // declaration saves writing. Set to be this.state.story above

  nextPicture = () => {
    if (this.state.zoomedImageKey + 1 === this.props.images.length) {
      this.setState({
        zoomedImageURL: `${this.props.images[0]}`,
        zoomedImageKey: 0
      });
    } else {
      this.setState({
        zoomedImageURL: `${this.props.images[this.state.zoomedImageKey + 1]}`,
        zoomedImageKey: this.state.zoomedImageKey + 1
      })
    }
  }

  previousPicture = () => {
    if (this.state.zoomedImageKey === 0) {
      this.setState({
        zoomedImageURL: `${this.props.images[this.props.images.length - 1]}`,
        zoomedImageKey: this.props.images.length - 1
      });
    } else {
      this.setState({
        zoomedImageURL: `${this.props.images[this.state.zoomedImageKey - 1]}`,
        zoomedImageKey: this.state.zoomedImageKey - 1
      });
    }
  }

  rdmNum = (x, y) => {
    return x + Math.random() * (y - x);
  }

  goToNextStory = () => {
    this.props.state.images[this.state.story + 1] ? this.setState({ story: this.state.story + 1 }) : this.setState({ story: 0 })
    window.scrollTo(0, 0)
    // this.props.state.images[this.state.story + 1] ? this.setState({ story: this.state.story + 1 }) : this.setState({ story: 0 })
    // window.scrollTo(0, 0)
  }

  nextStoryStyle = () => {
    this.state.nextStoryStyle.opacity === 0.5 ? this.setState({ nextStoryStyle: { opacity: 1 } }) : this.setState({ nextStoryStyle: { opacity: 0.5 } })
  }

  render() {
    // const story = this.state.story;

    return (
      <div className='story-page'>
        <LoadingScreen
          loadingWidgetOut={!this.state.loadingWidgetOut}
          stopLoader={this.state.stopLoader}
        />
        <div className='story-page_main-container'>
          {this.state.imagesLoaded &&
            <Navbar2 />
          }
          <div className='story-page_title'>
            <Spring
              from={{ transform: 'translateY(120px)' }}
              to={{ transform: this.state.titlesIn ? 'translateY(0%)' : 'translateY(120px)' }}
              config={config.slow}
            >
              {props =>
                <h1 style={props}>{this.props.title}</h1>
              }
            </Spring>
          </div>
          <div className='story-page_images'>
            {this.props.images.map((image, i) =>
              <div className={`story-page_images_image`} key={i}
                style={this.state.imageContainerStyles[i]}
              >
                <Spring
                  from={{ transform: 'translateY(800px)' }}
                  to={{ transform: this.state.titlesIn ? 'translateY(0%)' : 'translateY(800px)' }}
                  config={config.slow}
                >
                  {props =>
                    <img style={props} src={`${image}`} value={i} alt=''
                      onLoad={this.imagesOnLoad}
                      onClick={this.zoomOnImage}
                    ></img>
                  }
                </Spring>
              </div>
            )}
          </div>
          <div className='story-page_next-story'>
            <div className='story-page_next-story_container'>
              <div className='story-page_next-story_info'>
                <p className='story-page_next-story_info_next'>NEXT</p>
                <p className='story-page_next-story_info_name'>
                  {`${this.props.nextStoryTitle}`}
                </p>
                <Link to={`/stories/${this.props.nextStoryTitle}`}>
                  <p className='story-page_next-story_info_view'
                    onMouseEnter={this.nextStoryStyle}
                    onMouseLeave={this.nextStoryStyle}
                  >View collection
                <FontAwesomeIcon className='story-page_next-story_info_view_icon' icon={faArrowRight}></FontAwesomeIcon>
                  </p>
                </Link>
              </div>
              <div className='story-page_next-story_image'>
                <Link to={`/stories/${this.props.nextStoryTitle}`}>
                  <img alt=''
                    src={`${this.props.nextStoryImage}`}
                    style={this.state.nextStoryStyle}
                    onMouseEnter={this.nextStoryStyle}
                    onMouseLeave={this.nextStoryStyle}
                  >
                  </img>
                </Link>
              </div>
            </div>
          </div>
          {this.state.zoom &&
            <Zoom
              zoomedImageURL={this.state.zoomedImageURL}
              previousPicture={this.previousPicture}
              nextPicture={this.nextPicture}
              exitZoom={this.exitZoom}
              pictureNum={this.state.zoomedImageKey + 1}
              pgnationBG={(100 / this.props.images.length) * (this.state.zoomedImageKey + 1)}
              numImages={this.props.images.length}
            />
          }
        </div>
        {this.state.leavePage &&
          <Spring
            from={{ transform: 'translate(100%, 0)' }}
            to={{ transform: this.state.leavePage ? 'translate(0%, 0)' : 'translate(100%, 0)' }}
            config={config.slow}
          >
            {props =>
              <div style={props} className='page-transition'></div>
            }
          </Spring>
        }
      </div>
    )
  }
}

const StoryWithRouter = withRouter(Story);

export default StoryWithRouter;
