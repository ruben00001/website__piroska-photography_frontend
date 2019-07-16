import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import { animateScroll as scroller } from 'react-scroll'
import Axios from 'axios';
import Navbar from '../layout/Navbar'
import Story from './Story';
import { strapiAPI } from '../../enviroment/strapi-api';


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
    

    render() {
        if( this.props.location.state !== undefined) {
            if(this.props.location.state.fromHome) {
                scroller.scrollTo('stories-page_short_title', {
                    offset: 400
                })
            }
        }

        return (
            <React.Fragment>
                <Route exact path="/stories" render={() => 
                    <div className='stories-page'>
                        <Navbar navClass='navbar navbar--stories' iconClass='navbar_index-button_icon navbar_index-button_icon--stories' navTextClass='navbar_index-button_text navbar_index-button_text--stories' />
                        <div className='stories-page_title'>
                            <h1>Essays</h1>
                            <p>Stories of humans and the world told through my camera</p>
                        </div>
                        <div className='stories-page_story_container'>
                            { this.state.stories.map( story => 
                                <div className='stories-page_story' key={story.key} >
                                    <NavLink to={`/stories/${story.title}`}>
                                        <img onClick={this.showStory} src={`${this.homeURL}${story.mainImageURL}`} value={story.key} alt=''></img>
                                    </NavLink>
                                    <h3>{story.title}</h3>
                                </div>
                            ) }
                        </div>
                        <div className='stories-page_title stories-page_title--2'>
                            <h1>Short Stories</h1>
                            <p>Snapshots. The curious and interesting</p>
                        </div>
                        <div className='stories-page_short'>
                            { this.state.shortStories.map( story => 
                                <div className='stories-page_short_story' key={story.key} >
                                    <NavLink to={`/stories/${story.title}`}>
                                        <img onClick={this.showStory} src={`${this.homeURL}${story.mainImageURL}`} value={story.key} alt=''></img>
                                    </NavLink>
                                    <h3>{story.title}</h3>
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