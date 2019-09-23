import React from 'react';
import { Spring, config } from 'react-spring/renderprops';
import ReactResizeDetector from 'react-resize-detector';

export const Images = (props) => {

  return (
    <Spring
      from={{ opacity: 1 }}
      to={{
        opacity: props.filterImagesFadeOut ? 0 : 1
      }}
      config={config.gentle}
    >
      {propsA =>
        <div className='gallery-page_images-container'
          style={{
            ...propsA,
            marginTop: `${props.showFilterOptions ? window.innerWidth < 500 ? 30 : 50 : 20}px`
          }}
        >
          {props.displayFilterValue &&
            <h2 className='gallery-page_images_title'>{props.displayFilterValue}</h2>
          }
          <div className='gallery-page_images'
            style={!props.imgContainerHeight ? null :
              {
                height: `${props.imgContainerHeight}px`
              }
            }
          >
            {props.filteredImages && props.filteredImages.map((image, i) =>
              <div className='gallery-page_images_image' key={i}>
                <img src={`${image.url}`} value={i} alt=''
                  onClick={props.zoomOnImage}
                  onLoad={props.initialLoad ? props.onImageLoad : null}
                />
              </div>
            )}
          </div>
          <ReactResizeDetector handleWidth skipOnMount onResize={props.refreshPage} />
        </div>
      }
    </Spring>
  )
}