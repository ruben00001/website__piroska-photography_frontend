import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Spring, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye as faEyeSolid } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faMinusSquare, faEye } from "@fortawesome/free-regular-svg-icons";
import { strapiAPI } from '../../../environment/strapi-api';
import withZoom from '../../components/withZoom';
import withLoadingScreen from '../../components/withLoadingScreen';
import { Images } from './Images';


class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: null,
      tags: null,
      filteredImages: [],
      numImages: 0,
      imagesTotalHeight: 0,
      imageHeights: [],
      numImagesLoaded: 0,
      imageContainerVars: { columns: 0, extraspace: 0 },
      currentFilterValue: null,
      showFilterOptions: false,
      displayFilterValue: null,
      showDateFilter: false,
      showCategoryFilter: false,
      filterImagesFadeOut: false,
      imgContainerHeight: 0,
      initialLoad: true,
      conmponentsLoadFin: false
    }
  }


  componentDidMount() {
    document.body.style.overflow = 'hidden'; //prevent scrollbar appearing on load. Reintroduced after images load
    axios.get(`${strapiAPI}/galleries`)
      .then(response => {
        this.setState({
          images: response.data.map(image => {
            return (
              {
                url: image.image.url,
                tags: image.tags.map(tag => tag.name),
                key: image.id,
                date: Number(image.createdAt.substring(0, 10).split('').filter(item => item !== '-').join(''))
              }
            )
          }),
        });
      })
      .then(_ => {
        this.setState({
          filteredImages: this.state.images,
          numImages: this.state.images.length
        });
      })
      .then(_ => {
        this.props.defineImageDetails(this.state.displayFilterValue, this.state.numImages);
      });
    axios.get(`${strapiAPI}/tags`)
      .then(response => {
        this.setState({
          tags: response.data.map(tag => {
            return (
              {
                name: tag.name,
                id: tag.id
              }
            )
          })
        });
      })
  }


  onImageLoad = (e) => {
    this.setState({
      imagesTotalHeight: this.state.imagesTotalHeight + e.currentTarget.offsetHeight,
      imageHeights: [...this.state.imageHeights, e.currentTarget.offsetHeight],
      numImagesLoaded: this.state.numImagesLoaded + 1
    }, _ => {
      if (this.state.numImagesLoaded === this.state.numImages) {
        this.setImageContainerHeight();
        setTimeout(() => {
          this.setState({
            imgContainerHeight: (this.state.imagesTotalHeight / this.state.imageContainerVars.columns) + this.state.imageContainerVars.extraspace,
            initialLoad: false
          });
        }, 200);
        document.body.style.overflow = 'visible';
        this.props.onImagesLoad();
        setTimeout(() => { // allow for refresh of page when images finished loading
          this.setState({
            componentsLoadFin: true
          });
        }, 4850);
      }
    })
  }

  setImageContainerHeight = () => {
    let windowWidth = window.innerWidth;
    const windowParameters = [2000, 1800, 1600, 1500, 1400, 1300, 1100, 1000, 800, 500, 320];
    const columns = windowWidth > 800 ? 4 : windowWidth > 500 ? 3 : 2;
    const extraSpaces = [370, 340, 300, 290, 270, 250, 230, 190, 180, 160, 140, 120];

    if (windowWidth > 320) {
      for (let i = 0; i < windowParameters.length; i++) {
        if (windowWidth > windowParameters[i]) {
          this.setState({
            imageContainerVars: { columns: columns, extraspace: extraSpaces[i] }
          });
          break;
        }
      }
    } else {
      this.setState({
        imageContainerVars: { columns: columns, extraspace: 120 }
      });
    }
  }

  filterImages = (filter) => {
    let filteredImages = [];
    let filteredImagesHeight = 0;
    let imagesContainerHeight = 0;
    let filterValue = this.state.currentFilterValue;

    if (filter === 'category') {
      filteredImages = this.state.images.filter((image, i) => {
        if (image.tags.includes(filterValue)) {
          filteredImagesHeight += this.state.imageHeights[i]
          return image.tags.includes(filterValue)
        }
      });
    }
    else if (filter === 'none') {
      filteredImagesHeight = this.state.imagesTotalHeight;

      setTimeout(() => {
        this.setState({
          showFilterOptions: !this.state.showFilterOptions,
          currentFilterValue: null
        });
      }, 350);
    }
    else if (filter === 'newest' || filter === 'oldest') {
      filteredImages = filter === 'newest' ?
        this.state.images.concat().sort((a, b) => { return b.date - a.date }) : this.state.images.concat().sort((a, b) => { return a.date - b.date });

      filteredImagesHeight = this.state.imagesTotalHeight;
    }

    imagesContainerHeight = (filteredImagesHeight / this.state.imageContainerVars.columns) + this.state.imageContainerVars.extraspace;

    this.setState({
      filterImagesFadeOut: true
    })
    setTimeout(() => {
      this.setState({
        imgContainerHeight: imagesContainerHeight,
        filteredImages: filter === 'none' ? this.state.images : filteredImages,
        numImages: filteredImages.length,
        displayFilterValue: filter === 'category' ? filterValue : null
      }, _ => this.props.defineImageDetails(this.state.displayFilterValue, this.state.numImages));
    }, 500);
    setTimeout(() => {
      this.setState({
        filterImagesFadeOut: false
      })
    }, 1600);
  };

  refreshPage = () => { // for now refresh page when width of image container changes (i.e when window changes size)
    if (this.state.componentsLoadFin) window.location.reload();
  }


  render() {
    const { animatePage, zoomOnImage } = this.props;

    return (
      <div className='gallery-page'
        style={{ pointerEvents: animatePage ? 'auto' : 'none' }}
      >
        <Spring
          from={{ opacity: 0 }}
          to={{
            opacity: animatePage ? 1 : 0,
          }}
          config={config.slow}
        >
          {props =>
            <div style={props} className='gallery-page_container'>
              <h1 onClick={this.test} className='gallery-page_title'>Gallery</h1>
              <div style={{ overflow: 'hidden' }} className='gallery-page_filter'>
                <div className='gallery-page_filter_line gallery-page_filter_line--1'
                  onClick={() => this.state.displayFilterValue ?
                    this.filterImages('none') :
                    this.setState({ showFilterOptions: !this.state.showFilterOptions })
                  }
                >
                  {this.state.showFilterOptions ?
                    <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--box' icon={faMinusSquare}></FontAwesomeIcon> :
                    <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--box' icon={faPlusSquare}></FontAwesomeIcon>
                  }
                  <h3 className='gallery-page_filter_title'>{this.state.currentFilterValue ? 'un' : null}filter</h3>
                </div>
                <div className='gallery-page_filter_line'>
                  <div className='gallery-page_filter_second-line_dashed-line'></div>
                  {this.state.showFilterOptions &&
                    <div className='gallery-page_filter_second-line_options'>
                      <div className='gallery-page_filter_second-line_options'>
                        <div className='gallery-page_filter_line gallery-page_filter_line--1'
                          onClick={() => { this.setState({ showDateFilter: !this.state.showDateFilter }) }}
                        >
                          {this.state.showDateFilter ?
                            <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--box' icon={faMinusSquare}></FontAwesomeIcon> :
                            <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--box' icon={faPlusSquare}></FontAwesomeIcon>
                          }
                          <h3 className='gallery-page_filter_title'>by date</h3>
                        </div>
                        <div className='gallery-page_filter_second-line_options_option'>
                          <div className='gallery-page_filter_second-line_dashed-line'></div>
                          {this.state.showDateFilter &&
                            <div className='gallery-page_filter_second-line_options_option_content gallery-page_filter_second-line_options_option_content--1'>
                              <div className='gallery-page_filter_item gallery-page_filter_item--1'
                                onClick={_ => { this.filterImages('newest') }}
                              >
                                <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--eye' icon={faEye}></FontAwesomeIcon>
                                <div>most recent</div>
                              </div>
                              <div className='gallery-page_filter_item gallery-page_filter_item--1'
                                onClick={_ => this.filterImages('oldest')}
                              >
                                <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--eye' icon={faEye}></FontAwesomeIcon>
                                <div>oldest first</div>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                      <div className='gallery-page_filter_second-line_options'>
                        <div className='gallery-page_filter_line gallery-page_filter_line--1'
                          onClick={() => { this.setState({ showCategoryFilter: !this.state.showCategoryFilter }) }}
                        >
                          {this.state.showCategoryFilter ?
                            <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--box' icon={faMinusSquare}></FontAwesomeIcon> :
                            <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--box' icon={faPlusSquare}></FontAwesomeIcon>
                          }
                          <h3 className='gallery-page_filter_title'>category</h3>
                        </div>
                        <div className='gallery-page_filter_second-line_options_option'>
                          <div className='gallery-page_filter_second-line_dashed-line'></div>
                          {this.state.showCategoryFilter &&
                            <div className='gallery-page_filter_second-line_options_option_content gallery-page_filter_second-line_options_option_content--2'>
                              {this.state.tags && this.state.tags.map(tag =>
                                <div className='gallery-page_filter_item gallery-page_filter_item--2'
                                  onClick={_ => {
                                    this.setState({ currentFilterValue: tag.name }, _ => this.filterImages('category'));
                                  }}
                                  key={tag.id} value={tag.name}
                                >
                                  {this.state.displayFilterValue === tag.name ?
                                    <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--eye' icon={faEyeSolid}></FontAwesomeIcon> :
                                    <FontAwesomeIcon className='gallery-page_filter_icon gallery-page_filter_icon--eye' icon={faEye}></FontAwesomeIcon>
                                  }
                                  <div>{tag.name}</div>
                                </div>
                              )}
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <Images
                filterImagesFadeOut={this.state.filterImagesFadeOut}
                showFilterOptions={this.state.showFilterOptions}
                displayFilterValue={this.state.displayFilterValue}
                isState={this.state}
                imgContainerHeight={this.state.imgContainerHeight}
                filteredImages={this.state.filteredImages}
                zoomOnImage={zoomOnImage}
                initialLoad={this.state.initialLoad}
                onImageLoad={this.onImageLoad}
                refreshPage={this.refreshPage}
              />
            </div>
          }
        </Spring>
      </div>
    )
  }
}

export default withLoadingScreen(withZoom(withRouter(Gallery), 'Gallery'), '/gallery');