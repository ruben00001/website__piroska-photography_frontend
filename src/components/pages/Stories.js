import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import { animateScroll as scroller } from 'react-scroll'
import Axios from 'axios';
import Navigation from '../layout/Navbar'
import Story from './Story';
import { Icons } from '../../data/Icons';
import { strapiAPI } from '../../enviroment/strapi-api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { faTenge } from "@fortawesome/free-solid-svg-icons";


class StoriesX extends Component {
    constructor(props) {
        super(props)

        this.storiesRef = React.createRef()

        this.state = {
            stories: [],
            currentStory: 0,
            shortStories: [],
            currentShortStory: 0,
        }
    }

    homeURL = strapiAPI;

    componentDidMount() {
        Axios.get(`${this.homeURL}/stories`)
            .then(response => {
                this.setState({
                    stories: response.data.map( story => {
                        return (
                            { 
                                title: story.title,
                                mainImageURL: story.mainimage.url,  
                                imageURLs: story.images.map(image => image.url),
                                key: story.id
                            }
                        )
                    }),
                });
            })
            .then(_ => {
                console.log('====================================');
                console.log(this.randomIcon());
                console.log('====================================');
            })
        Axios.get(`${this.homeURL}/shortstories`)
            .then(response => {
                this.setState({
                    shortStories: response.data.map( story => {
                        return (
                            { 
                                title: story.title,
                                mainImageURL: story.mainimage.url,  
                                imageURLs: story.images.map(image => image.url),
                                key: story.id
                            }
                        )
                    }),
                });
            })
    }

    showStory = (e) => {
        this.setState({
            currentStory: Number(e.currentTarget.getAttribute('value')) - 1
        })
    }

    showShortStory = (e) => {
        this.setState({
            currentShortStory: Number(e.currentTarget.getAttribute('value')) - 1
        })
    }

    showref = () => {
        scroller.scrollTo('stories-page_short')
    }

    randomIcon = () => {
        return Math.floor(Math.random() * Icons.length)
    }

    Icons = Icons
    

    render() {

        return (
            <React.Fragment>
                <Route exact path="/stories" render={() => 
                    <div className='stories-page'>
                        <Navigation />
                        <div className='stories-page_title'>
                            <h1>Stories</h1>
                            <p>of humans and the world told through my camera</p>
                        </div>
                        <div className='stories-page_story_container'>
                            { this.state.stories.map( (story, i) => 
                                <div className={`stories-page_story stories-page_story--${i}`} key={i} >
                                    <NavLink to={`/stories/${story.title}`}>
                                        <div className={`stories-page_story_img-container stories-page_story_img-container--${i}`}>
                                            <img onClick={this.showStory} className={`stories-page_story_image stories-page_story_image--${i}`} src={`${this.homeURL}${story.mainImageURL}`} value={story.key} alt=''></img>
                                            <div className={`stories-page_story_title stories-page_story_title--${i}`}>
                                                <img src={require(`../../img/${this.Icons[this.randomIcon()]}`)}></img>
                                                <div></div>
                                                <h3>{story.title}</h3>
                                            </div>                                            
                                        </div>
                                    </NavLink>
                                </div>
                            ) }
                        </div>
                    </div>
                } />
                { this.state.stories.map( story => 
                    <Route path={`/stories/${story.title}`} key={story.key} render={() => 
                        <Story title={story.title} imageURLs={story.imageURLs} />                      
                    } /> 
                )}           
                { this.state.shortStories.map( story => 
                    <Route path={`/stories/${story.title}`} key={story.key} render={() => 
                        <Story title={story.title} imageURLs={story.imageURLs} />                      
                    } /> 
                )}           
            </React.Fragment>
        )
    }
}

const Stories = withRouter(StoriesX)

export default Stories;