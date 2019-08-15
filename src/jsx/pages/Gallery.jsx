import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { plus} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faMinusSquare, faEye } from "@fortawesome/free-regular-svg-icons";
import { strapiAPI } from '../../enviroment/strapi-api';
import { Accordion, Button } from 'react-bootstrap/';
import { Spring, config } from 'react-spring/renderprops';
import { withRouter } from "react-router-dom";
import Zoom from '../components/Zoom';
import LoadingScreen from '../components/Loading-screen';
import Logo from '../components/Logo';
import Navbar2 from '../layout/navbar/Navbar2';

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialLoad: true,
      images: null,
      tags: null,
      filteredImages: [],
      zoom: false,
      zoomedImageURL: null,
      zoomedImageKey: null,
      imagesTotalHeight: 0,
      imgContainerHeight: 0,
      imagesHeights: [],
      imageContainerVars: { columns: 0, extraspace: 0 },
      filter: 0,
      numImages: 0,
      numImagesLoaded: 0,
      imagesLoaded: false,
      loadingWidgetOut: false,
      stopLoader: false,
      titlesIn: false,
      showFilterOptions: false,
      showDateFilter: false,
      showCategoryFilter: false
    }
  }

  homeURL = strapiAPI;

  componentDidMount() {
    if (window.innerWidth > 800) {
      this.setState({
        imageContainerVars: { columns: 4, extraspace: 140 }
      })
    }
    if (window.innerWidth > 500 && window.innerWidth <= 800) {
      this.setState({
        imageContainerVars: { columns: 3, extraspace: 130 }
      })
    }
    if (window.innerWidth <= 500) {
      this.setState({
        imageContainerVars: { columns: 2, extraspace: 130 }
      })
    }
    axios.get(`${this.homeURL}/galleries`)
      .then(response => {
        this.setState({
          images: response.data.map(image => {
            return (
              {
                url: image.image.url,
                tags: image.tags.map(tag => tag.name),
                key: image.id
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
      });
    axios.get(`${this.homeURL}/tags`)
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

  imagesOnLoad = (e) => {
    this.setState({
      imagesTotalHeight: this.state.imagesTotalHeight + e.currentTarget.offsetHeight,
      imagesHeights: [...this.state.imagesHeights, e.currentTarget.offsetHeight],
      numImagesLoaded: this.state.numImagesLoaded + 1
    }, _ => {
      if (this.state.numImagesLoaded === this.state.numImages) {
        this.setState({
          imgContainerHeight: this.state.imagesTotalHeight / this.state.imageContainerVars.columns + this.state.imageContainerVars.extraspace,
          initialLoad: false
        })
        setTimeout(() => {
          this.setState({
            imagesLoaded: true
          })
        }, 350);
        setTimeout(_ => {
          this.setState({
            stopLoader: true
          })
        }, 800);
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


  filterImages = (e) => {
    let filteredImagesHeight = 0;
    let imagesContainerHeight = 0;

    let filteredImages = this.state.images.filter((image, i) => {
      if (image.tags.includes(e.currentTarget.getAttribute('value'))) {
        filteredImagesHeight += this.state.imagesHeights[i]

        return image.tags.includes(e.currentTarget.getAttribute('value'))
      }
    });

    imagesContainerHeight = (filteredImagesHeight / this.state.imageContainerVars.columns) + this.state.imageContainerVars.extraspace;

    this.setState({
      imgContainerHeight: imagesContainerHeight,
      filteredImages: filteredImages,
      numImages: filteredImages.length
    });
  };

  showAllImages = () => {
    let imagesContainerHeight = (this.state.imagesTotalHeight / this.state.imageContainerVars.columns) + this.state.imageContainerVars.extraspace;

    this.setState({
      filteredImages: this.state.images,
      imgContainerHeight: imagesContainerHeight,
      numImages: this.state.images.length
    });
  };

  zoomOnImage = (e) => {
    this.setState({
      zoomedImageURL: e.currentTarget.src,
      zoom: true,
      zoomedImageKey: Number(e.currentTarget.getAttribute('value'))
    }, () => console.log(this.state.zoomedImageKey));
  }

  exitZoom = () => {
    this.setState({
      zoom: false
    })
  }

  nextPicture = () => {
    if (this.state.zoomedImageKey + 1 === this.state.filteredImages.length) {
      this.setState({
        zoomedImageURL: `${this.state.filteredImages[0].url}`,
        zoomedImageKey: 0
      });
    } else {
      this.setState({
        zoomedImageURL: `${this.state.filteredImages[this.state.zoomedImageKey + 1].url}`,
        zoomedImageKey: this.state.zoomedImageKey + 1
      })
    }
  }

  previousPicture = () => {
    if (this.state.zoomedImageKey === 0) {
      this.setState({
        zoomedImageURL: `${this.state.filteredImages[this.state.filteredImages.length - 1].url}`,
        zoomedImageKey: this.state.filteredImages.length - 1
      });
    } else {
      this.setState({
        zoomedImageURL: `${this.state.filteredImages[this.state.zoomedImageKey - 1].url}`,
        zoomedImageKey: this.state.zoomedImageKey - 1
      });
    }
  }


  test = () => {
    console.log(this.state.imagesHeights);
  }

  render() {
    return (
      <div className='gallery-page'>
        <LoadingScreen
          loadingWidgetOut={!this.state.loadingWidgetOut}
          stopLoader={this.state.stopLoader}
        />
        {this.state.imagesLoaded &&
          <React.Fragment>
            <Navbar2 />
            <Logo />
          </React.Fragment>
        }
        <Spring
          from={{ opacity: 0, pointerEvents: 'none' }}
          to={{
            opacity: this.state.titlesIn ? 1 : 0,
            pointerEvents: this.state.titlesIn ? 'auto' : 'none',
          }}
          config={config.slow}
        >
          {props =>
            <div style={props} className='gallery-page_container'>
              <h1 className='gallery-page_title'>Gallery</h1>
              <div className='gallery-page_filter'>
                <div className='gallery-page_filter_first-line'
                  onClick={() => { this.setState({ showFilterOptions: !this.state.showFilterOptions }) }}
                >
                  {this.state.showFilterOptions ?
                    <FontAwesomeIcon className='gallery-page_filter_icon' icon={faMinusSquare}></FontAwesomeIcon> :
                    <FontAwesomeIcon className='gallery-page_filter_icon' icon={faPlusSquare}></FontAwesomeIcon>
                  }
                  <h3>filter</h3>
                </div>
                <div className='gallery-page_filter_second-line'>
                  <div className='gallery-page_filter_second-line_dashed-line'></div>
                  {this.state.showFilterOptions &&
                    <div className='gallery-page_filter_second-line_options'>
                      <div className='gallery-page_filter_second-line_options'>
                        <div className='gallery-page_filter_second-line_options_title'
                          onClick={() => { this.setState({ showDateFilter: !this.state.showDateFilter }) }}
                        >
                          {this.state.showDateFilter ?
                            <FontAwesomeIcon className='gallery-page_filter_icon' icon={faMinusSquare}></FontAwesomeIcon> :
                            <FontAwesomeIcon className='gallery-page_filter_icon' icon={faPlusSquare}></FontAwesomeIcon>
                          }
                          <h3>by date</h3>
                        </div>
                        <div className='gallery-page_filter_second-line_options_1'>
                          <div className='gallery-page_filter_second-line_dashed-line'></div>
                          {this.state.showDateFilter &&
                            <div className='gallery-page_filter_second-line_options_1_content'>
                              <div className='gallery-page_filter_second-line_options_1_content_item'>
                                <FontAwesomeIcon className='gallery-page_filter_second-line_options_1_content_item_icon' icon={faEye}></FontAwesomeIcon>
                                <div>most recent</div>
                              </div>
                              <div className='gallery-page_filter_second-line_options_1_content_item'>
                                <FontAwesomeIcon className='gallery-page_filter_second-line_options_1_content_item_icon' icon={faEye}></FontAwesomeIcon>
                                <div>oldest first</div>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                      <div className='gallery-page_filter_second-line_options'>
                        <div className='gallery-page_filter_second-line_options_title'
                          onClick={() => { this.setState({ showCategoryFilter: !this.state.showCategoryFilter }) }}
                        >
                          {this.state.showCategoryFilter ?
                            <FontAwesomeIcon className='gallery-page_filter_icon' icon={faMinusSquare}></FontAwesomeIcon> :
                            <FontAwesomeIcon className='gallery-page_filter_icon' icon={faPlusSquare}></FontAwesomeIcon>
                          }
                          <h3>category</h3>
                        </div>
                        <div className='gallery-page_filter_second-line_options_2'>
                          <div className='gallery-page_filter_second-line_dashed-line'></div>
                          {this.state.showCategoryFilter &&
                            <div className='gallery-page_filter_second-line_options_2_content'>
                              {this.state.tags && this.state.tags.map(tag =>
                                <div className='gallery-page_filter_second-line_options_2_content_item'
                                  onClick={this.filterImages}
                                  key={tag.id} value={tag.name}
                                >
                                  <FontAwesomeIcon className='gallery-page_filter_second-line_options_2_content_item_icon' icon={faEye}></FontAwesomeIcon>
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
              {/* <Accordion defaultActiveKey="0">
                <Accordion.Toggle onClick={this.test} as={Button} variant="link" eventKey="1" className='gallery-page_title'>
                  Categories
                  <FontAwesomeIcon className='gallery-page_title_icon' icon={faCaretDown}></FontAwesomeIcon>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <div className='gallery-page_category_container'>
                    <p onClick={this.showAllImages} className='gallery-page_category'>All</p>
                    {this.state.tags && this.state.tags.map(tag =>
                      <p onClick={this.filterImages} className='gallery-page_category' key={tag.id} value={tag.name}>{tag.name}</p>
                    )}
                  </div>
                </Accordion.Collapse>
              </Accordion> */}
              <div className='gallery-page_images-container'>
                <div className='gallery-page_images'
                  style={!this.state ? null :
                    { height: `${this.state.imgContainerHeight}px` }
                  }
                >
                  {this.state.filteredImages.map((image, i) =>
                    <div className='gallery-page_images_image' key={i}>
                      <img src={`${image.url}`} value={i} alt=''
                        onClick={this.zoomOnImage}
                        onLoad={this.state.initialLoad ? this.imagesOnLoad : null}
                      ></img>
                    </div>
                  )}
                </div>
              </div>
              {this.state.zoom &&
                <Zoom
                  zoomedImageURL={this.state.zoomedImageURL}
                  previousPicture={this.previousPicture}
                  nextPicture={this.nextPicture}
                  exitZoom={this.exitZoom}
                  pictureNum={this.state.zoomedImageKey + 1}
                  pgnationBG={(100 / this.state.numImages) * (this.state.zoomedImageKey + 1)}
                  numImages={this.state.numImages}
                />
              }
            </div>
          }
        </Spring>
      </div>
    )
  }
}

export default withRouter(Gallery);