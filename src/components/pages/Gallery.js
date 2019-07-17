import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../layout/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';

class Gallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: null,
            tags: null,
            filteredImages: [],
            numberImages: 0,
            zoom: false,
            zoomedImageURL: null,
            zoomedImageKey: null
        }
    }

    homeURL = strapiAPI;
    
    componentDidMount() {
        axios.get(`${this.homeURL}/images`)
          .then(response => {
            this.setState({
              images: response.data.map( image => {
                return (
                  { url: image.image.url,
                    tags: image.tags.map(tag => tag.title),
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
                  <p onClick={this.filterImages} className='gallery-page_tag' key={tag.id} value={tag.name}>{tag.name}</p>
                )
              })
            });
          });
    }

    filterImages = (e) => { 
      this.setState({
        filteredImages: this.state.images.filter( image => image.tags.includes(e.currentTarget.getAttribute('value')))
      });   
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
      this.setState({
        zoomedImageURL: e.currentTarget.src,
        zoom: true,
        zoomedImageKey: Number(e.currentTarget.getAttribute('value') - 1)
      });
    }

    exitZoom = () => {
      this.setState({
        zoom: false
      })
    }

    nextPicture = () => {
      if(this.state.zoomedImageKey + 1 === this.state.numberImages) {
        this.setState({
          zoomedImageURL: `${this.homeURL}${this.state.images[0].url}`,
          zoomedImageKey: 0
        });
      } else {
        this.setState({
          zoomedImageURL: `${this.homeURL}${this.state.images[this.state.zoomedImageKey + 1].url}`,
          zoomedImageKey: this.state.zoomedImageKey + 1
        })
      }
    }

    previousPicture = () => {
      if(this.state.zoomedImageKey === 0) {
        this.setState({
          zoomedImageURL: `${this.homeURL}${this.state.images[this.state.numberImages - 1].url}`,
          zoomedImageKey: this.state.numberImages - 1
        });
      } else {
        this.setState({
          zoomedImageURL: `${this.homeURL}${this.state.images[this.state.zoomedImageKey - 1].url}`,
          zoomedImageKey: this.state.zoomedImageKey - 1
        });
      }
    }

    render() {
      return (
        <div className='gallery-page'>
          <Navbar navClass='navbar navbar--gallery' iconClass='navbar_index-button_icon navbar_index-button_icon--stories' navTextClass='navbar_index-button_text navbar_index-button_text--stories' />
          <div className='gallery-page_container'>
            <div className='gallery-page_menu'>
              <h3>Themes</h3>
              <p onClick={this.showAllImages} className='gallery-page_tag'>All</p>
              { this.state.tags }
            </div>
            <div className='gallery-page_menu gallery-page_menu--fake'></div>
            <div className='gallery-page_images'>
              <div>
                { this.state.filteredImages.map( image => 
                  <img onClick={this.zoomOnImage} className='gallery-page_images_image' src={`${this.homeURL}${image.url}`} key={image.key} value={image.key} alt=''></img>
                )}
              </div>
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