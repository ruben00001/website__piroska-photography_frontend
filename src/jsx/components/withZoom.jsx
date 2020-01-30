import React, { Component } from 'react';
import Zoom from './Zoom';

const withZoom = (WrappedComponent, page) => {
  class WithZoom extends Component {
    constructor(props) {
      super(props);

      this.state = {
        images: null,
        showZoom: false,
        zoomedImageURL: null,
        zoomedImageNum: null,
        imageCollectionName: null,
        numImages: null,
        showControl: false,
        arrowPressed: false
      };
    }

    passImagesToZoom = images => {
      this.setState({
        images: images
      });
    };

    zoomOnImage = e => {
      this.setState({
        zoomedImageURL: e.currentTarget.src,
        showZoom: true,
        zoomedImageNum: Number(e.currentTarget.getAttribute('value'))
      });
    };

    exitZoom = () => {
      this.setState({
        showZoom: false
      });
    };

    changePicture = direction => {
      const setZoomState = (url, key) => {
        this.setState({
          zoomedImageURL: url,
          zoomedImageNum: key
        });
      };

      const { zoomedImageNum } = this.state;

      if (page === 'Gallery') {
        const { images } = this.state;

        direction === 'next'
          ? zoomedImageNum + 1 === images.length
            ? setZoomState(`${images[0].url}`, 0)
            : setZoomState(
                `${images[zoomedImageNum + 1].url}`,
                zoomedImageNum + 1
              )
          : zoomedImageNum === 0
          ? setZoomState(`${images[images.length - 1].url}`, images.length - 1)
          : setZoomState(
              `${images[zoomedImageNum - 1].url}`,
              zoomedImageNum - 1
            );
      } else if (page === 'Story') {
        const { images } = this.props;
        
        direction === 'next'
          ? zoomedImageNum + 1 === images.length
            ? setZoomState(`${images[0]}`, 0)
            : setZoomState(
                `${images[zoomedImageNum + 1]}`,
                zoomedImageNum + 1
              )
          : zoomedImageNum === 0
          ? setZoomState(`${images[images.length - 1]}`, images.length - 1)
          : setZoomState(
              `${images[zoomedImageNum - 1]}`,
              zoomedImageNum - 1
            );
      }
    };

    defineImageDetails = (collectionName, numTotal) => {
      this.setState({
        imageCollectionName: collectionName,
        numImages: numTotal
      });
    };

    render() {
      return (
        <>
          {this.state.showZoom && (
            <Zoom
              imgURL={this.state.zoomedImageURL}
              imageNum={this.state.zoomedImageNum + 1}
              imagesName={this.state.imageCollectionName}
              numImages={this.state.numImages}
              exitZoom={this.exitZoom}
              changePicture={this.changePicture}
            />
          )}
          <WrappedComponent
            zoomOnImage={this.zoomOnImage}
            defineImageDetails={this.defineImageDetails}
            passImagesToZoom={this.passImagesToZoom}
            {...this.props}
          />
        </>
      );
    }
  }
  return WithZoom;
};

export default withZoom;
