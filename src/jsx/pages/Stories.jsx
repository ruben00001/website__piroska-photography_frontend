import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import Axios from 'axios';
import Navbar2 from '../layout/navbar/Navbar2'
import Story from './Story';
import { strapiAPI } from '../../enviroment/strapi-api';
import { Spring, config } from 'react-spring/renderprops';
import CountUp from 'react-countup';
import LoadingWidget from '../components/Loading-widget';


class StoriesX extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stories: [],
            currentStory: 0,
            images: [],
            floats: [],
            storyPaddingTop: false,
            containerStyle: [],
            windowWidth: window.innerWidth,
            numImagesLoaded: 0,
            imagesLoaded: false,
            containerStyles: [],
            imageDimensions: [],
            imageStyles: [],
            counterDuration: 20,
            loadingWidgetOut: false,
            stopLoader: false,
            titlesIn: false
        }
    }

    homeURL = strapiAPI;

    componentDidMount() {
        Axios.get(`${this.homeURL}/essays`)
            .then(response => {
                this.setState({
                    stories: response.data.map((story, i) => {
                        return (
                            {
                                title: story.title,
                                mainImageURL: story.mainimage.url,
                                imageURLs: story.image.map(image => image.url),
                                order: story.order,
                                key: story.id
                            }
                        )
                    }),
                });
            })
            .then(_ => {
                this.setState({
                    stories: this.state.stories.sort((a, b) => {
                        return a.order - b.order
                    })
                })
            })
    }

    imagesOnLoad = () => {
        this.setState({
            numImagesLoaded: this.state.numImagesLoaded + 1,
        }, _ => {
            if (this.state.numImagesLoaded === this.state.stories.length) {
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

    showStory = (e) => {
        this.setState({
            currentStory: Number(e.currentTarget.getAttribute('value')) - 1
        })
    }


    test = () => {
        console.log(this.state.stories);
    }


    render() {
        return (
            <React.Fragment>
                <Route exact path="/stories" render={() =>
                    <div className='stories-page'>
                        <div className='loading-screen'>
                            <div className='x' >
                                <Spring
                                    from={{ opacity: 0, transform: 'translateY(0px)' }}
                                    to={{
                                        opacity: 1,
                                        transform: !this.state.loadingWidgetOut ? 'translateY(0px)' : 'translateY(-100px)'
                                    }}
                                    config={config.slow}
                                >
                                    {props =>
                                        <div style={props}>
                                            <LoadingWidget
                                                stopLoader={this.state.stopLoader}
                                            />
                                        </div>
                                    }
                                </Spring>
                            </div>
                        </div>
                        {this.state.imagesLoaded &&
                            <React.Fragment>
                                <Navbar2 />
                                <div className='logo'>
                                    <p>Piros <br /> Photography.</p>
                                </div>
                            </React.Fragment>
                        }
                        <div className='stories-page_title'>
                            <Spring
                                from={{ transform: 'translateY(300px)' }}
                                to={{ transform: this.state.titlesIn ? 'translateY(0px)' : 'translateY(300px)' }}
                                config={config.slow}
                            >
                                {props =>
                                    <div className='stories-page_title_main'>
                                        <h1 style={props} onClick={this.test}>Stories</h1>
                                    </div>
                                }
                            </Spring>
                            <Spring
                                from={{ transform: 'translateY(100px)' }}
                                to={{ transform: this.state.titlesIn ? 'translateY(0px)' : 'translateY(100px)' }}
                                config={config.slow}
                            >
                                {props =>
                                    <div className='stories-page_title_sub'>
                                        <h2 style={props}>Humans and the world told through my camera</h2>
                                    </div>
                                }
                            </Spring>
                        </div>
                        <div onClick={this.test} className='stories-page_story_container'>
                            {this.state.stories.map((story, i) =>
                                <div className='stories-page_story' key={i}>
                                    <NavLink to={{
                                        pathname: `/stories/story`,
                                        state: {
                                            story: i,
                                            images: this.state.stories.map(story => story.imageURLs),
                                            titles: this.state.stories.map(story => story.title),
                                            mainImage: this.state.stories.map(story => story.mainImageURL)
                                        }
                                    }}>
                                        <Spring
                                            from={{ transform: 'translateY(800px)' }}
                                            to={{ transform: this.state.titlesIn ? 'translateY(0%)' : 'translateY(800px)' }}
                                            config={config.slow}
                                        >
                                            {props =>
                                                <div style={props} className='stories-page_story_img-container'>
                                                    <div className={`stories-page_story_title`}>
                                                        <h3>{story.title}</h3>
                                                    </div>
                                                    <img onLoad={this.imagesOnLoad} className='stories-page_story_image' src={`${story.mainImageURL}`} value={story.key} alt=''
                                                        onClick={this.showStory}
                                                    >
                                                    </img>
                                                </div>
                                            }
                                        </Spring>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                } />
                <Route path={`/stories/story`}
                    render={({ location }) => {
                        const { state } = location;
                        return (
                            <Story state={state} />
                        )
                    }

                    } />
            </React.Fragment>
        )
    }
}

const Stories = withRouter(StoriesX)

export default Stories;