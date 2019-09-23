import React, { Component } from 'react';
import Zoom from './Zoom';

const withZoom = (WrappedComponent, page) => {
  class WithZoom extends Component {
    constructor(props) {
      super(props)

      this.state = {
        showZoom: false,
        zoomedImageURL: null,
        zoomedImageNum: null,
        imageCollectionName: null,
        numImages: null,
        showControl: false,
        arrowPressed: false
      }
    }

    zoomOnImage = (e) => {
      this.setState({
        zoomedImageURL: e.currentTarget.src,
        showZoom: true,
        zoomedImageNum: Number(e.currentTarget.getAttribute('value'))
      });
    }

    exitZoom = () => {
      this.setState({
        showZoom: false
      })
    }

    changePicture = (direction) => {
      const setZoomState = (url, key) => {
        this.setState({
          zoomedImageURL: url,
          zoomedImageNum: key
        })
      }

      const { zoomedImageNum } = this.state;
      const { images } = this.props;

      direction === 'next' ?
        zoomedImageNum + 1 === images.length ?
          setZoomState(`${images[0]}`, 0) :
          setZoomState(`${images[zoomedImageNum + 1]}`, zoomedImageNum + 1) :
        zoomedImageNum === 0 ?
          setZoomState(`${images[images.length - 1]}`, images.length - 1) :
          setZoomState(`${images[zoomedImageNum - 1]}`, zoomedImageNum - 1);
    }

    defineImageDetails = (collectionName, numTotal) => {
      this.setState({
        imageCollectionName: collectionName,
        numImages: numTotal
      });
    }


    render() {

      return (
        <>
          {
            this.state.showZoom &&
            <Zoom
              imgURL={this.state.zoomedImageURL}
              imageNum={this.state.zoomedImageNum + 1}
              imagesName={this.state.imageCollectionName}
              numImages={this.state.numImages}
              exitZoom={this.exitZoom}
              changePicture={this.changePicture}
            />
          }
          <WrappedComponent
            zoomOnImage={this.zoomOnImage}
            defineImageDetails={this.defineImageDetails}
            {...this.props}
          />
        </>
      )
    }
  }
  return WithZoom;
}

export default withZoom;