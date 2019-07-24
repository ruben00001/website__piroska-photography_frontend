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
            floated: 0,
            margin: false
        }

        this.rdmFloat = this.rdmFloat.bind(this);
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
                                dimensions: story.dimensions,
                                key: story.id
                            }
                        )
                    }),
                });
            })
            .then(_ => {
                this.setState({
                    images: this.state.stories.map( (story, i) => 
                                <div style={this.rdmFloat()} className={`stories-page_story stories-page_story--${i}`} key={i} >
                                    <NavLink to={`/stories/${story.title}`}>
                                        <div style={this.rdmImageSizePos()} className={`stories-page_story_img-container stories-page_story_img-container--${i}`}>
                                            <img onLoad={this.getDimensions} onClick={this.showStory} className={`stories-page_story_image stories-page_story_image--${i}`} src={`${this.homeURL}${story.mainImageURL}`} value={story.key} alt=''></img>
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
            })
    }

    Icons = Icons

    showStory = (e) => {
        this.setState({
            currentStory: Number(e.currentTarget.getAttribute('value')) - 1
        })
    }

    randomIcon = () => {
        return Math.floor(Math.random() * Icons.length)
    }

    rdmNum = (x, y) => {
        return x + Math.floor(Math.random() * (y - x))
     }

    getDimensions = ({target:img}) => {
        console.log('====================================');
        console.log(img.naturalHeight, img.naturalWidth);
        console.log('====================================');
    }

    rdmFloat = () => {
        let style = null;
        let num = Math.random();
        if(this.state.floated === 0 && num < 6/11) {
            style = {
                float: 'left',
                width: '50%',
                marginTop: this.rdmNum(300, 500)
            };
            this.setState({
                floated: 1
            });
        } else if (this.state.floated === 1) {
            style = {
                float: 'right',
                width: '50%'
            }

            this.setState({
                floated: 2
            });
        } else {
            style = {
                width: '100%'
            }

            this.setState({
                floated: 0
            })
        }

        return style;
    }

    rdmImageSizePos = () => {
        let style = null;

        style = {
            width: '40%',
            marginLeft: '30%'
        }
        return style
    }



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
                        <div onClick={this.test} className='stories-page_story_container'>
                            {this.state.images}
                        </div>
                    </div>
                } />
                { this.state.stories.map( story => 
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


// { this.state.stories.map( (story, i) => 
//     <div className={`stories-page_story stories-page_story--${i}`} key={i} >
//         <NavLink to={`/stories/${story.title}`}>
//             <div className={`stories-page_story_img-container stories-page_story_img-container--${i}`}>
//                 <img onClick={this.showStory} className={`stories-page_story_image stories-page_story_image--${i}`} src={`${this.homeURL}${story.mainImageURL}`} value={story.key} alt=''></img>
//                 <div className={`stories-page_story_title stories-page_story_title--${i}`}>
//                     <img src={require(`../../img/${this.Icons[this.randomIcon()]}`)} alt=''></img>
//                     <div></div> {/* makes a line don't delete */}
//                     <h3>{story.title}</h3>
//                 </div>                                            
//             </div>
//         </NavLink>
//     </div>
// ) }

// test = () => {
//     console.log('====================================');
//     console.log(this.state.floated);
//     console.log('====================================');
//     if(this.state.floated === 0 ) {
//         console.log('====================================');
//         console.log(`left`);
//         console.log('====================================');
//         this.setState({
//             floated: 1
//         });
//     } else if (this.state.floated === 1) {
//         console.log('====================================');
//         console.log(`right`);
//         console.log('====================================');
//         this.setState({
//             floated: 2
//         });
//     } else {
//         console.log('====================================');
//         console.log(`center`);
//         console.log('====================================');
//         this.setState({
//             floated: 0
//         })
//     }
//     console.log('====================================');
//     console.log(`***fin***....${this.state.floated}`);
//     console.log('====================================');
// }