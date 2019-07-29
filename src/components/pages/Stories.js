import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import Axios from 'axios';
import Navigation from '../layout/Navbar'
import Story from './Story';
import { Icons } from '../../data/Icons';
import { strapiAPI } from '../../enviroment/strapi-api';


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
            windowWidth: window.innerWidth
        }

        this.setFloatAndPaddingTop = this.setFloatAndPaddingTop.bind(this);
    }

    homeURL = strapiAPI;

    componentDidMount() {
        this.determineFloat();
        Axios.get(`${this.homeURL}/stories`)
            .then(response => {

                this.setState({
                    stories: response.data.map( (story, i) => {
                        return (
                            { 
                                title: story.title,
                                mainImageURL: story.mainimage.url,  
                                imageURLs: story.images.map(image => image.url),
                                dimensions: story.width/story.height,
                                style: this.imgWidthMargin(story.width/story.height, i),
                                key: story.id
                            }
                        )
                    }),
                });
            })
            .then(_ => {
                this.setState({
                    images: this.state.stories.map( (story, i) => 
                                <div className={`stories-page_story stories-page_story--${i}`} key={i} 
                                     style={this.setFloatAndPaddingTop(i)} 
                                >
                                    <NavLink to={{
                                        pathname: `/stories/story`,
                                        state: { story: i,
                                                 images: this.state.stories.map(story => story.imageURLs),
                                                 titles: this.state.stories.map(story => story.title) 
                                        }  
                                        }}>
                                        <div className={`stories-page_story_img-container stories-page_story_img-container--${i}`}
                                             style={story.style}      
                                        >
                                            <img className={`stories-page_story_image stories-page_story_image--${i}`} src={`${this.homeURL}${story.mainImageURL}`} value={story.key} alt=''
                                                onClick={this.showStory} 
                                            >
                                            </img>
                                            <div className={`stories-page_story_title stories-page_story_title--${i}`}>
                                                <img src={require(`../../img/${this.Icons[this.randomIcon()]}`)} alt=''></img>
                                                <div></div> {/* makes a line don't delete */}
                                                <h3>{story.title}</h3>
                                            </div>                                            
                                        </div>
                                    </NavLink>
                                </div>
                    )
                })
            });
             
            // .then(_ => {
            //     console.log('====================================');
            //     console.log(window.innerWidth);
            //     console.log('====================================');
            // })
    }


    determineFloat = () => {
        let floats = [];
        floats.push(Math.round(Math.random()))
        for (let i = 1; i < 100; i++) {
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

    setFloatAndPaddingTop = (i) => {
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

        
        return style;
    }

    imgWidthMargin = (x, i) => {

        let width = 0;
        let multiplier = 1;

        if(this.state.windowWidth > 600 && this.state.windowWidth <= 800) multiplier = 1.5;
        else if(this.state.windowWidth <= 600) multiplier = 2.5;
        else if (this.state.floats[i]) multiplier = 2;

        const calcStyle = (a, b) => {
            width = x * multiplier * this.rdmNum(a, b);
            return {width: `${width}%`, marginLeft: `${this.rdmNum(width, 90) - width}%`}
        }

        if(x < 0.65) { 
            return calcStyle(29, 32)
        }
        if((x >= .65 && x < .9)) { 
            return calcStyle(25, 33)
        }
        if(x >= .9 && x < 1.1) { 
            return calcStyle(20, 33)
        }
        if(x >= 1.1 && x < 1.3) { 
            return calcStyle(17, 28)
        }
        if(x >= 1.3 && x < 1.6) { 
            return calcStyle(15, 23)
        }
        if(x >= 1.6) { 
            return calcStyle(14, 18)
        }
    }

    Icons = Icons

    randomIcon = () => {
        return Math.floor(Math.random() * Icons.length)
    }


    showStory = (e) => {
        this.setState({
            currentStory: Number(e.currentTarget.getAttribute('value')) - 1
        })
    }



    test = () => {
        console.log(this.state.windowWidth);
    }



    render() {
        return (
            <React.Fragment>
                <Route exact path="/stories" render={() => 
                    <div className='stories-page'>
                        <Navigation />
                        <div className='stories-page_title'>
                            <h1 onClick={this.test}>Stories</h1>
                            <p>of humans and the world told through my camera</p>
                        </div>
                        <div onClick={this.test} className='stories-page_story_container'>
                            {this.state.images}
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