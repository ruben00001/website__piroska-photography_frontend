import React, { useState, useEffect } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import ReactResizeDetector from 'react-resize-detector';

export const Images = props => {

  const [imgWidth, setImgWidth] = useState(null);

  useEffect(() => {
    let imgWidth;
    const pageContainerWidth =
      window.innerWidth * 0.9 >= 1800 ? 1800 : window.innerWidth * 0.9;

    switch (pageContainerWidth) {
      case window.innerWidth <= 500:
        imgWidth = pageContainerWidth * 0.5 - 3;
        break;
      case window.innerWidth <= 801:
        imgWidth = pageContainerWidth * (1 / 3) - 5;
        break;
      default:
        imgWidth = pageContainerWidth * 0.25 - 7.5;
    }

    setImgWidth(imgWidth);
  }, []);

  const handleZoom = e => {
    props.passImagesToZoom();
    props.zoomOnImage(e);
  }


  return (
    <Spring
      from={{ opacity: 1 }}
      to={{
        opacity: props.filterImagesFadeOut ? 0 : 1
      }}
      config={config.gentle}
    >
      {propsA => (
        <div
          className='gallery-page_images-container'
          style={{
            ...propsA,
            marginTop: `${
              props.showFilterOptions ? (window.innerWidth < 500 ? 30 : 50) : 20
            }px`
          }}
        >
          {props.displayFilterValue && (
            <h2 className='gallery-page_images_title'>
              {props.displayFilterValue}
            </h2>
          )}
          <div
            className='gallery-page_images'
            style={
              !props.imgContainerHeight
                ? null
                : {
                    height: `${props.imgContainerHeight}px`
                  }
            }
          >
            {props.filteredImages && imgWidth &&
              props.filteredImages.map((image, i) => (
                <div className='gallery-page_images_image' key={i}>
                  <img
                    src={`${image.url.replace(
                      'upload/',
                      `upload/w_${Math.round(imgWidth)},q_auto:best,f_auto/`
                    )}`}
                    value={i}
                    alt=''
                    onClick={e => handleZoom(e)}
                    // onClick={props.zoomOnImage}
                    onLoad={props.initialLoad ? props.onImageLoad : null}
                  />
                </div>
              ))}
          </div>
          <ReactResizeDetector
            handleWidth
            skipOnMount
            onResize={props.refreshPage}
          />
        </div>
      )}
    </Spring>
  );
};
