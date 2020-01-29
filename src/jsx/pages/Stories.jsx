import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Axios from 'axios';
import { Spring, config } from 'react-spring/renderprops';
import withLoadingScreen from '../components/withLoadingScreen';
import { SpringSlideUp } from '../components/SpringSlideUp';
import Story from './Story';
import { strapiAPI } from '../../environment/strapi-api';

class Stories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      storyRoutes: [],
      numImagesLoaded: 0,
      leavePage: false
    };
  }

  componentDidMount() {
    let imgWidth;

    const calculateImgWidth = _ => {
      let screenWidth = window.innerWidth;
      const scrollbarWidth = 25;

      if (screenWidth >= 800) screenWidth -= scrollbarWidth;

      const pageContainerWidth = screenWidth * 0.9 >= 1800 ? 1800 * 0.9 : screenWidth > 500 ? screenWidth * 0.9 : screenWidth * 0.95;
      
      switch (pageContainerWidth) {
        case pageContainerWidth <= 320 :
          imgWidth = pageContainerWidth * 0.9;
          break;
        case pageContainerWidth <= 380 :
          imgWidth = pageContainerWidth * 0.485;
          break;
        case pageContainerWidth <= 500 :
          imgWidth = pageContainerWidth * 0.48;
          break;
        default:
          imgWidth = pageContainerWidth * 0.45;
      }
    };
    calculateImgWidth();

    Axios.get(`${strapiAPI}/essays`)
      .then(response => {
        const stories = response.data
          .map((story, i) => {
            const imgUrl = story.mainimage.url.replace(
              'upload/',
              `upload/w_${Math.round(imgWidth)},q_auto:best,f_auto/`
            );

            return {
              title: story.title,
              mainImageURL: imgUrl,
              imageURLs: story.image.map(image => image.url),
              order: story.order,
              key: story.id
            };
          })
          .sort((a, b) => {
            return a.order - b.order;
          });
        this.setState({
          stories: stories
        });
      })
      .then(_ => {
        let storyRoutes = this.state.stories.map((story, i) => (
          <Route
            path={`/stories/${story.title}`}
            render={props => (
              <Story
                images={story.imageURLs}
                title={story.title}
                nextStoryImage={
                  this.state.stories[i + 1]
                    ? this.state.stories[i + 1].mainImageURL
                    : this.state.stories[0].mainImageURL
                }
                nextStoryTitle={
                  this.state.stories[i + 1]
                    ? this.state.stories[i + 1].title
                    : this.state.stories[0].title
                }
                {...props}
              />
            )}
            key={i}
          ></Route>
        ));
        this.setState({
          storyRoutes: storyRoutes
        });
      });
  }

  onImageLoad = () => {
    this.setState(
      {
        numImagesLoaded: this.state.numImagesLoaded + 1
      },
      _ => {
        if (this.state.numImagesLoaded === this.state.stories.length) {
          this.props.onImagesLoad();
        }
      }
    );
  };

  routeStory = title => {
    this.setState({
      leavePage: true
    });
    setTimeout(() => {
      this.setState({
        leavePage: false
      });
      this.props.history.push({
        pathname: `/stories/${title}`
      });
    }, 1000);
  };

  render() {
    const { animatePage } = this.props;

    return (
      <>
        <Route
          exact
          path='/stories'
          render={() => (
            <div
              className='stories-page'
              style={{ pointerEvents: animatePage ? 'auto' : 'none' }}
            >
              <div className='stories-page_title'>
                <div className='stories-page_title_main'>
                  <SpringSlideUp showTitles={animatePage}>
                    <h1>Stories</h1>
                  </SpringSlideUp>
                </div>
                <div className='stories-page_title_sub'>
                  <SpringSlideUp showTitles={animatePage}>
                    <h2>Humans and the world told through my camera</h2>
                  </SpringSlideUp>
                </div>
              </div>
              <div className='stories-page_story_container'>
                {this.state.stories.map((story, i) => (
                  <div
                    className='stories-page_story'
                    key={i}
                    value={i}
                    onClick={() => {
                      this.routeStory(story.title);
                    }}
                  >
                    <SpringSlideUp showTitles={animatePage}>
                      <div className='stories-page_story_img-container'>
                        <div className={`stories-page_story_title`}>
                          <h3>{story.title}</h3>
                        </div>
                        <img
                          className='stories-page_story_image'
                          src={`${story.mainImageURL}`}
                          value={story.key}
                          alt=''
                          onLoad={this.onImageLoad}
                        />
                      </div>
                    </SpringSlideUp>
                  </div>
                ))}
              </div>
              {this.state.leavePage && (
                <Spring
                  from={{ transform: 'translate(100%, 0)' }}
                  to={{
                    transform: this.state.leavePage
                      ? 'translate(0%, 0)'
                      : 'translate(100%, 0)'
                  }}
                  config={config.slow}
                >
                  {props => (
                    <div style={props} className='page-transition'></div>
                  )}
                </Spring>
              )}
            </div>
          )}
        />
        {this.state.storyRoutes}
      </>
    );
  }
}

export default withLoadingScreen(withRouter(Stories), '/stories');
