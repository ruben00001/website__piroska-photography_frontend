import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye as faEyeSolid } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faMinusSquare, faEye } from "@fortawesome/free-regular-svg-icons";
import { strapiAPI } from '../../enviroment/strapi-api';
import { Spring, config } from 'react-spring/renderprops';
import { withRouter } from "react-router-dom";
import Zoom from '../components/Zoom';
import LoadingScreen from '../components/Loading-screen';
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
      imageHeights: [],
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
      showCategoryFilter: false,
      currentFilterValue: null,
      displayFilterValue: null,
      filterImagesFadeOut: false
    }
  }

  homeURL = strapiAPI;

  componentDidMount() {
    if (window.innerWidth > 1100) {
      this.setState({
        imageContainerVars: { columns: 4, extraspace: 240 }
      })
    }
    if (window.innerWidth > 1000 && window.innerWidth <= 1100) {
      this.setState({
        imageContainerVars: { columns: 4, extraspace: 180 }
      })
    }
    if (window.innerWidth > 800 && window.innerWidth <= 1000) {
      this.setState({
        imageContainerVars: { columns: 4, extraspace: 180 }
      })
    }
    if (window.innerWidth > 500 && window.innerWidth <= 800) {
      this.setState({
        imageContainerVars: { columns: 3, extraspace: 160 }
      })
    }
    if (window.innerWidth > 320 && window.innerWidth <= 500) {
      this.setState({
        imageContainerVars: { columns: 2, extraspace: 140 }
      })
    }
    if (window.innerWidth <= 320) {
      this.setState({
        imageContainerVars: { columns: 2, extraspace: 120 }
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
      imageHeights: [...this.state.imageHeights, e.currentTarget.offsetHeight],
      numImagesLoaded: this.state.numImagesLoaded + 1
    }, _ => {
      if (this.state.numImagesLoaded === this.state.numImages) {
        this.setState({
          imgContainerHeight: (this.state.imagesTotalHeight / this.state.imageContainerVars.columns) + this.state.imageContainerVars.extraspace,
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
      });
    }, 500);
    setTimeout(() => {
      this.setState({
        filterImagesFadeOut: false
      })
    }, 1600);
  };

  zoomOnImage = (e) => {
    this.setState({
      zoomedImageURL: e.currentTarget.src,
      zoom: true,
      zoomedImageKey: Number(e.currentTarget.getAttribute('value'))
    });
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
    console.log(this.state.images);
  }

  render() {
    return (
      <div className='gallery-page'
      >
        <LoadingScreen
          loadingWidgetOut={!this.state.loadingWidgetOut}
          stopLoader={this.state.stopLoader}
          removeLoader={this.state.titlesIn}
        />
        {this.state.imagesLoaded &&
          <React.Fragment>
            <Navbar2
              currentPage={'/gallery'}
            />
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
              <h1 onClick={this.test} className='gallery-page_title'>Gallery</h1>
              <div style={{overflow: 'hidden'}} className='gallery-page_filter'>
                <div className='gallery-page_filter_line gallery-page_filter_line--1'
                  onClick={() => {
                    if (this.state.displayFilterValue) this.filterImages('none');
                    else this.setState({ showFilterOptions: !this.state.showFilterOptions });
                  }}
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
              <Spring
                from={{ opacity: 1 }}
                to={{
                  opacity: this.state.filterImagesFadeOut ? 0 : 1
                }}
                config={config.gentle}
              >
                {props =>
                  <div style={{ ...props, marginTop: `${this.state.showFilterOptions ? 50 : 20}px` }} className='gallery-page_images-container'>
                    {this.state.displayFilterValue &&
                      <h2 className='gallery-page_images_title'>{this.state.displayFilterValue}</h2>
                    }
                    <div className='gallery-page_images'
                      style={!this.state ? null :
                        {
                          height: `${this.state.imgContainerHeight}px`
                        }
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
                }
              </Spring>
            </div>
          }
        </Spring>
        {this.state.zoom &&
          <Zoom
            zoomedImageURL={this.state.zoomedImageURL}
            previousPicture={this.previousPicture}
            nextPicture={this.nextPicture}
            exitZoom={this.exitZoom}
            pictureNum={this.state.zoomedImageKey + 1}
            pgnationBG={(100 / this.state.numImages) * (this.state.zoomedImageKey + 1)}
            numImages={this.state.numImages}
            imagesName={this.state.displayFilterValue}
            showZoom={this.state.zoom}
          />
        }
      </div>
    )
  }
}

export default withRouter(Gallery);



// showAllImages = () => {
//   let imagesContainerHeight = (this.state.imagesTotalHeight / this.state.imageContainerVars.columns) + this.state.imageContainerVars.extraspace;

//   if (this.state.displayFilterValue) {
//     this.setState({
//       filterImagesFadeOut: true
//     });
//     setTimeout(() => {
//       this.setState({
//         showFilterOptions: !this.state.showFilterOptions
//       });
//     }, 350);
//     setTimeout(() => {
//       this.setState({
//         filteredImages: this.state.images,
//         imgContainerHeight: imagesContainerHeight,
//         numImages: this.state.images.length,
//         displayFilterValue: null
//       });
//     }, 500);
//     setTimeout(() => {
//       this.setState({
//         filterImagesFadeOut: false
//       })
//     }, 1200);
//   }
// };