import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faChevronRight, faChevronLeft, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Navigation from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';
import Dropdown from 'react-bootstrap/Dropdown';
import { Accordion, Card, Button} from 'react-bootstrap/';

class Gallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: null,
            tags: null,
            filteredImages: [],
            zoom: false,
            zoomedImageURL: null,
            zoomedImageKey: null,
            imagesTotalHeight: 0,
            imagesHeights: [],
            imageContainerVars: {columns: 0, extraspace: 0}
        }
    }

    homeURL = strapiAPI;
    
    componentDidMount() {
      if(window.innerWidth > 800) {
        this.setState({
          imageContainerVars: {columns: 4, extraspace: 200}
        })
      }
      if(window.innerWidth > 500 && window.innerWidth <= 800) {
        this.setState({
          imageContainerVars: {columns: 3, extraspace: 130}
        })
      }
      if(window.innerWidth <= 500) {
        this.setState({
          imageContainerVars: {columns: 2, extraspace: 130}
        })
      }
        axios.get(`${this.homeURL}/galleries`)
          .then(response => {
            this.setState({
              images: response.data.map( image => {
                return (
                  { url: image.image.url,
                    tags: image.tags.map(tag => tag.name),
                    key: image.id
                  }
                )
              }),
            });
          })
          .then( _ => {
            this.setState({
              filteredImages: this.state.images,
              numberImages: this.state.images.length
            });
          });
        axios.get(`${this.homeURL}/tags`)
          .then(response => {
            this.setState({
              tags: response.data.map(tag => {
                return (
                  <p onClick={this.filterImages} className='gallery-page_category' key={tag.id} value={tag.name}>{tag.name}</p>
                )
              })
            });
          });
    }

    addHeight = (e) => {
      this.setState({
        imagesTotalHeight: this.state.imagesTotalHeight + e.currentTarget.offsetHeight,
        imagesHeights: [...this.state.imagesHeights, e.currentTarget.offsetHeight]
      })
    }

    filterImages = (e) => { 
      let filteredImagesHeight = 0;
      
      let filteredImages = this.state.images.filter((image, i) => {                   
                              if(image.tags.includes(e.currentTarget.getAttribute('value'))) {
                                  filteredImagesHeight += this.state.imagesHeights[i]
                                  return image.tags.includes(e.currentTarget.getAttribute('value'))
                              }                              
                            })
      console.log(filteredImagesHeight);
      
      this.setState({
        imagesTotalHeight: filteredImagesHeight,
        filteredImages: filteredImages
      })
      // this.setState({
      //   filteredImages: this.state.images.filter( image => image.tags.includes(e.currentTarget.getAttribute('value')))
      // });   
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      }); 
    }

    showAllImages = () => {
      this.setState({
        filteredImages: this.state.images
      });
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      }); 
    }

    zoomOnImage = (e) => {
      console.log(e.currentTarget);
      
      this.setState({
        zoomedImageURL: e.currentTarget.src,
        zoom: true,
        zoomedImageKey: Number(e.currentTarget.getAttribute('value'))
      }, () => console.log(this.state.zoomedImageKey)      );
    }

    exitZoom = () => {
      this.setState({
        zoom: false
      })
    }

    nextPicture = () => {
      if(this.state.zoomedImageKey + 1 === this.state.filteredImages.length) {
        this.setState({
          zoomedImageURL: `${this.homeURL}${this.state.filteredImages[0].url}`,
          zoomedImageKey: 0
        });
      } else {
        this.setState({
          zoomedImageURL: `${this.homeURL}${this.state.filteredImages[this.state.zoomedImageKey + 1].url}`,
          zoomedImageKey: this.state.zoomedImageKey + 1
        })
      }
    }

    previousPicture = () => {
      if(this.state.zoomedImageKey === 0) {
        this.setState({
          zoomedImageURL: `${this.homeURL}${this.state.filteredImages[this.state.filteredImages.length - 1].url}`,
          zoomedImageKey: this.state.filteredImages.length - 1
        });
      } else {
        this.setState({
          zoomedImageURL: `${this.homeURL}${this.state.filteredImages[this.state.zoomedImageKey - 1].url}`,
          zoomedImageKey: this.state.zoomedImageKey - 1
        });
      }
    }


    test = () => {
      // console.log(this.state.images);      
    }

    render() {
      return (
        <div className='gallery-page'>
          <Navigation />
          <Accordion defaultActiveKey="0">  
            <Accordion.Toggle onClick={this.test} as={Button} variant="link" eventKey="1" className='gallery-page_title'>
              Categories
              <FontAwesomeIcon className='gallery-page_title_icon' icon={faCaretDown}></FontAwesomeIcon>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <div className='gallery-page_category_container'>
                <p onClick={this.showAllImages} className='gallery-page_category'>All</p>
                { this.state.tags }
              </div>
            </Accordion.Collapse>
          </Accordion>
          <div className='gallery-page_container'>
            <div className='gallery-page_images'
                 style={ !this.state ? null : 
                       {height: `${this.state.imagesTotalHeight / this.state.imageContainerVars.columns + this.state.imageContainerVars.extraspace}px`}
                }
            >
                { this.state.filteredImages.map( (image, i) =>
                  <div className='gallery-page_images_image' key={i}>
                    <img src={`${this.homeURL}${image.url}`} value={i} alt=''
                      onClick={this.zoomOnImage}
                      onLoad={this.addHeight}
                    ></img>
                  </div>
                )}
            </div>
          </div>
          { this.state.zoom && 
            <div className='gallery-page_zoom-image'>
              <div className='gallery-page_zoom-image_image'>
                <img src={this.state.zoomedImageURL} alt=''></img>
                <FontAwesomeIcon onClick={this.previousPicture} className='gallery-page_zoom-image_arrow gallery-page_zoom-image_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
                <FontAwesomeIcon onClick={this.nextPicture} className='gallery-page_zoom-image_arrow gallery-page_zoom-image_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
                <FontAwesomeIcon onClick={this.exitZoom} className='gallery-page_zoom-image_x' icon={faTimesCircle}></FontAwesomeIcon>
              </div>
            </div>
          }
        </div>
        )
    }
}

export default Gallery;