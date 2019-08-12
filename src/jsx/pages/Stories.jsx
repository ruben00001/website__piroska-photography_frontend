import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import Axios from 'axios';
// import Navigation from '../layout/Navbar'
import Story from './Story';
import { strapiAPI } from '../../enviroment/strapi-api';
import {Spring, config} from 'react-spring/renderprops';
import CountUp from 'react-countup';


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
            counterDuration: 20
        }

        this.setFloatAndPaddingTop = this.setFloatAndPaddingTop.bind(this);
    }

    homeURL = strapiAPI;

    componentDidMount() {
        Axios.get(`${this.homeURL}/essays`)
            .then(response => {
                this.setState({
                    stories: response.data.map( (story, i) => {
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
            .then(_ => {
                this.determineFloat();
                this.setFloatAndPaddingTop();
            })
    }

    imagesOnLoad = ({target:img}) => {
        const imageDimension = img.offsetWidth / img.offsetHeight;        

        this.setState({
            numImagesLoaded: this.state.numImagesLoaded + 1,
            imageDimensions: [...this.state.imageDimensions, imageDimension]
        }, _ => {
            if(this.state.numImagesLoaded === this.state.stories.length) {
                this.imgWidthMargin();
                this.setState({
                    counterDuration: 5
                })
                setTimeout(() => {
                    this.setState({
                        imagesLoaded: true
                    })
                }, 350);
            }
        })
    }

    determineFloat = () => {
        let floats = [];
        floats.push(Math.round(Math.random()))
        for (let i = 1; i < this.state.stories.length; i++) {
            if(floats[i-1] === 0 && Math.random() < 6/11) {
                floats.push(1)   
            } else if (floats[i-1] === 1) {
                floats.push(2)
            } else {
                floats.push(0)
            }
        }
        this.setState({
            floats: floats
        })
    }

    rdmNum = (x, y) => {
        return x + Math.random() * (y - x);
    }

    setFloatAndPaddingTop = () => {
        let floatStyles = [];
        this.state.stories.forEach((story, i) => {
            let style = null;
            let paddingTop = 0;
            if (this.state.windowWidth > 1200) paddingTop = this.rdmNum(110,180);
            if (this.state.windowWidth <= 1200 && this.state.windowWidth > 960) paddingTop = this.rdmNum(80,150);
            if (this.state.windowWidth <= 960 && this.state.windowWidth > 800) paddingTop = this.rdmNum(60, 130);
            if (this.state.windowWidth > 600 && this.state.windowWidth <= 800) paddingTop = this.rdmNum(50, 90);
            if (this.state.windowWidth <= 600) paddingTop = this.rdmNum(30, 90);
    
            if (this.state.windowWidth > 800) {
                if(this.state.floats[i] === 1) {
                
                    if(!this.state.storyPaddingTop && Math.random() < 1/2) {
                        paddingTop += 70;
                        this.setState({
                            storyPaddingTop: true
                        })
                    } else {
                        paddingTop = 60;
                    }
        
                    style = {
                        float: 'left',
                        width: '50%',
                        paddingTop: paddingTop
                    };
        
                } else if (this.state.floats[i] === 2) {
        
                    if(!this.state.storyPaddingTop) {
                        paddingTop += 70;
                    } else {
                        paddingTop = 60;
                    }
        
                    this.setState({
                        storyPaddingTop: false
                    })
        
                    style = {
                        float: 'right',
                        width: '50%',
                        paddingTop: paddingTop
                    }
        
                } else {
        
                    style = {
                        width: '100%',
                        paddingTop: paddingTop
                    }
        
                }
            } else {
                style = {
                    width: '100%',
                    paddingTop: paddingTop
                }
            }
    
            floatStyles.push(style)
        })
        this.setState({
            containerStyles: floatStyles
        })
    }

    imgWidthMargin = () => {
        let styles = [];
        this.state.stories.forEach((story, i) => {
            let width = 0;
            let multiplier = 1;
            let dimension = this.state.imageDimensions[i];
    
            if(this.state.windowWidth > 600 && this.state.windowWidth <= 800) multiplier = 1.5;
            else if(this.state.windowWidth <= 600) multiplier = 2.5;
            else if (this.state.floats[i]) multiplier = 2;
    
            const calcStyle = (a, b) => {
                width = dimension * multiplier * this.rdmNum(a, b);
                return {width: `${width}%`, marginLeft: `${this.rdmNum(width, 90) - width}%`}
            }
    
            if(dimension < 0.65) { 
                styles.push(calcStyle(29, 32)) 
            }
            if((dimension >= .65 && dimension < .9)) { 
                styles.push(calcStyle(25, 33)) 
            }
            if(dimension >= .9 && dimension < 1.1) { 
                styles.push(calcStyle(20, 33)) 
            }
            if(dimension >= 1.1 && dimension < 1.3) { 
                styles.push(calcStyle(17, 28)) 
            }
            if(dimension >= 1.3 && dimension < 1.6) { 
                styles.push(calcStyle(15, 23)) 
            }
            if(dimension >= 1.6) { 
                styles.push(calcStyle(14, 18)) 
            }
        })
        this.setState({
            imageStyles: styles
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
                        <Spring
                            from={{ backgroundColor: 'white', opacity: 1, zIndex: 1 }}
                            to={{ opacity: !this.state.imagesLoaded ? 1 : 0, zIndex: !this.state.imagesLoaded ? 1 : -1 }}
                            config={ config.mollases }
                            >
                            {props => 
                                <div style={props} className='loading-screen'>
                                    <CountUp className='counter counter--stories' 
                                        end={100}
                                        duration={this.state.counterDuration} 
                                        useEasing={false}
                                        onEnd={({ start }) => start()}
                                    />
                                </div>  
                            }
                        </Spring>
                        {/* { this.state.imagesLoaded && 
                          <Navigation />
                        } */}
                        <div className='stories-page_title'>
                            <h1 onClick={this.test}>Stories</h1>
                            <p>of humans and the world told through my camera</p>
                        </div>
                        <div onClick={this.test} className='stories-page_story_container'>
                            { this.state.stories.map( (story, i) => 
                                <div className={`stories-page_story stories-page_story--${i}`} key={i} 
                                     style={ this.state.containerStyles[i] ? this.state.containerStyles[i] : null} 
                                >
                                    <NavLink to={{
                                        pathname: `/stories/story`,
                                        state: { story: i,
                                                 images: this.state.stories.map(story => story.imageURLs),
                                                 titles: this.state.stories.map(story => story.title),
                                                 mainImage: this.state.stories.map(story => story.mainImageURL)
                                        }  
                                        }}>
                                        <div className={'stories-page_story_img-container'}
                                             style={this.state.imageStyles[i] ? this.state.imageStyles[i] : null}      
                                        >
                                            <img onLoad={this.imagesOnLoad} className={`stories-page_story_image stories-page_story_image--${i}`} src={`${story.mainImageURL}`} value={story.key} alt=''
                                                onClick={this.showStory} 
                                            >
                                            </img>
                                            <div className={`stories-page_story_title`}>
                                                <div></div> {/* makes a line don't delete */}
                                                <h3>{story.title}</h3>
                                            </div>                                            
                                        </div>
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