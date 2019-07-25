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
            floats: [],
            padding: false,
            containerStyle: [],
        }

        this.rdmFloat = this.rdmFloat.bind(this);
    }

    homeURL = strapiAPI;

    componentDidMount() {
        this.float();

        Axios.get(`${this.homeURL}/stories`)
            .then(response => {
                console.log('====================================');
                console.log(this.state.floats);
                console.log('====================================');
                this.setState({
                    stories: response.data.map( story => {
                        return (
                            { 
                                title: story.title,
                                mainImageURL: story.mainimage.url,  
                                imageURLs: story.images.map(image => image.url),
                                dimensions: story.width/story.height,
                                style: {
                                        width: `${this.imgWidth(story.width/story.height)}%`,
                                        marginLeft: ``
                                        },
                                key: story.id
                            }
                        )
                    }),
                });
            })
            // .then(_ => {
            //     console.log('====================================');
            //     console.log(this.state.stories[0].style);
            //     console.log('====================================');
            // })
            .then(_ => {
                this.setState({
                    images: this.state.stories.map( (story, i) => 
                                <div className={`stories-page_story stories-page_story--${i}`} key={i} 
                                     style={this.rdmFloat()} 
                                >
                                    <NavLink to={`/stories/${story.title}`}>
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
        return x + Math.random() * (y - x);
    }

    imgWidth = (x) => {
        if(x < 0.65) return x * this.rdmNum(29, 32)
        if(x > .65 && x < .9) return x * this.rdmNum(25, 33)
        if(x > .9 && x < 1.1) return x * this.rdmNum(20, 33)
        if(x > 1.1 && x < 1.3) return x * this.rdmNum(17, 28)
        if(x > 1.3) return x * this.rdmNum(14, 18)
    }

    float = () => {
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

    rdmFloat = () => {
        let style = null;

        if(this.state.floated === 0 && Math.random() < 6/11) {
            let paddingTop = 100;
            if(!this.state.padding && Math.random() < 1/2) {
                paddingTop = this.rdmNum(200,370);
                this.setState({
                    margin: true
                })
            }
            style = {
                float: 'left',
                width: '50%',
                paddingTop: paddingTop
            };
            this.setState({
                floated: 1
            });
        } else if (this.state.floated === 1) {
            let paddingTop = 100;
            if(!this.state.padding) {
                paddingTop = this.rdmNum(200,370);
            }
            this.setState({
                margin: false
            })
            style = {
                float: 'right',
                width: '50%',
                paddingTop: paddingTop
            }
            this.setState({
                floated: 2
            });
        } else {
            style = {
                width: '100%',
                paddingTop: this.rdmNum(200, 300)
            }
            this.setState({
                floated: 0
            })
        }
        return style;
    }

    test = () => {
        this.float();
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

// .then(_ => {
//     console.log('====================================');
//     console.log(this.state.containerStyle);
//     console.log('====================================');
// })

// getDimensions = ({target:img}) => {
//     this.setState({
//         dimensions: [...this.state.dimensions, img.naturalHeight/img.naturalWidth]
//     },
//         () => this.setState({
//             containerStyle: this.state.dimensions.map(_ => {
//                 return {width: '30%', marginLeft: '30%'}
//             })
//         },
//             () => this.setState({images: this.state.images})              
//         )
//     );
// }

            // .then(_=> {
            //     this.setState({
            //         containerStyle: this.state.stories.map(story => { 
            //             return {
            //                 width: '50%', 
            //                 marginLeft: '10%'
            //             }
            //         })
            //     })
            // })