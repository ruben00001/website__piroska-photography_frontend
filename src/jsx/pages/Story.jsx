import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Spring, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import withZoom from '../components/withZoom';
import withLoadingScreen from '../components/withLoadingScreen';
import { SpringSlideUp } from '../components/SpringSlideUp';

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageContainerStyles: [],
      numImagesLoaded: 0,
      nextStoryStyle: { opacity: 0.5 }
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0); // a bug where page loads to bottom
    this.setImageContainerStyles(this.props.images);
    this.props.defineImageDetails(this.props.title, this.props.images.length);
  }

  setImageContainerStyles = images => {
    let style = {};
    let styles = [];
    let widthLeft = 0;

    const rdmNum = (x, y) => {
      return x + Math.random() * (y - x);
    };

    let screenWidth = window.innerWidth;
    const scrollbarWidth = 25;

    if (screenWidth >= 800) screenWidth -= scrollbarWidth;

    const pageContainerWidth =
      screenWidth * 0.9 >= 1800
        ? 1800
        : screenWidth > 800
        ? screenWidth * 0.9
        : screenWidth * 0.98;

    images.forEach((image, i) => {
      if (i % 2 === 0) {
        widthLeft = rdmNum(35, 65);
        style = {
          width: widthLeft
        };
      } else {
        style = {
          width: 100 - widthLeft,
          textAlign: 'right'
        };
      }

      const imgContainerWidth = pageContainerWidth * (style.width / 100);
      let imgWidth;

      switch (imgContainerWidth) {
        case imgContainerWidth <= 330:
          imgWidth = imgContainerWidth * 0.98;
          break;
        case imgContainerWidth <= 380:
          imgWidth = imgContainerWidth * 0.96;
          break;
        case imgContainerWidth <= 500:
          imgWidth = imgContainerWidth * 0.94;
          break;
        default:
          imgWidth = imgContainerWidth * 0.9;
      }

      const imgUrl = image.replace(
        'upload/',
        `upload/w_${Math.round(imgWidth)},q_auto:best,f_auto/`
      );

      style.url = imgUrl;

      styles.push(style);
    });

    this.setState({
      imageContainerStyles: styles
    });
  };

  onImageLoad = () => {
    this.setState(
      {
        numImagesLoaded: this.state.numImagesLoaded + 1
      },
      _ => {
        if (this.state.numImagesLoaded === this.props.images.length) {
          this.props.onImagesLoad();
        }
      }
    );
  };

  goToNextStory = () => {
    this.props.state.images[this.state.story + 1]
      ? this.setState({ story: this.state.story + 1 })
      : this.setState({ story: 0 });
    window.scrollTo(0, 0);
  };

  nextStoryStyle = () => {
    this.state.nextStoryStyle.opacity === 0.5
      ? this.setState({ nextStoryStyle: { opacity: 1 } })
      : this.setState({ nextStoryStyle: { opacity: 0.5 } });
  };

  render() {
    const { animatePage, zoomOnImage } = this.props;
    const { imageContainerStyles } = this.state;

    return (
      <div className='story-page'>
        <div className='story-page_main-container'>
          <div className='story-page_title'>
            <SpringSlideUp showTitles={animatePage}>
              <h1>{this.props.title}</h1>
            </SpringSlideUp>
          </div>
          <div className='story-page_images'>
            {this.state.imageContainerStyles[0] &&
              this.props.images.map((image, i) => {

                return (
                  <div
                    className={`story-page_images_image`}
                    key={i}
                    style={{ width: `${imageContainerStyles[i].width}%` }}
                  >
                    <SpringSlideUp showTitles={animatePage}>
                      <img
                        src={imageContainerStyles[i].url}
                        value={i}
                        alt=''
                        onLoad={this.onImageLoad}
                        onClick={zoomOnImage}
                      ></img>
                    </SpringSlideUp>
                  </div>
                );
              })}
          </div>
          <Spring
            from={{ opacity: 0 }}
            to={{
              opacity: animatePage ? 1 : 0
            }}
            config={config.slow}
          >
            {props => (
              <div style={props} className='story-page_next-story'>
                <div className='story-page_next-story_container'>
                  <div className='story-page_next-story_info'>
                    <p className='story-page_next-story_info_next'>NEXT</p>
                    <p className='story-page_next-story_info_name'>
                      {`${this.props.nextStoryTitle}`}
                    </p>
                    <Link to={`/stories/${this.props.nextStoryTitle}`}>
                      <p
                        className='story-page_next-story_info_view'
                        onMouseEnter={this.nextStoryStyle}
                        onMouseLeave={this.nextStoryStyle}
                      >
                        View collection
                        <FontAwesomeIcon
                          className='story-page_next-story_info_view_icon'
                          icon={faArrowRight}
                        ></FontAwesomeIcon>
                      </p>
                    </Link>
                  </div>
                  <div className='story-page_next-story_image'>
                    <Link to={`/stories/${this.props.nextStoryTitle}`}>
                      <img
                        alt=''
                        src={`${this.props.nextStoryImage}`}
                        style={this.state.nextStoryStyle}
                        onMouseEnter={this.nextStoryStyle}
                        onMouseLeave={this.nextStoryStyle}
                      ></img>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Spring>
        </div>
        {/* {this.state.leavePage &&
          <Spring
            from={{ transform: 'translate(100%, 0)' }}
            to={{ transform: this.state.leavePage ? 'translate(0%, 0)' : 'translate(100%, 0)' }}
            config={config.slow}
          >
            {props =>
              <div style={props} className='page-transition'></div>
            }
          </Spring>
        } */}
      </div>
    );
  }
}

export default withLoadingScreen(
  withZoom(withRouter(Story), 'Story'),
  '/story'
);
