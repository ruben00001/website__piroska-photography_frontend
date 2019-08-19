import React from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Zoom = (props) => {
  return (
    <Spring
      from={{ opacity: 0, transform: 'scale(0.95)' }}
      to={{
        opacity: 1,
        transform: 'scale(1)'
      }}
    >
      {propsA =>
        <div style={propsA} className='zoom'>
          <div className='zoom_image'>
            <img src={props.zoomedImageURL} alt=''></img>
            <FontAwesomeIcon onClick={props.previousPicture} className='zoom_arrow zoom_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
            <FontAwesomeIcon onClick={props.nextPicture} className='zoom_arrow zoom_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
            <FontAwesomeIcon onClick={props.exitZoom} className='zoom_x' icon={faTimes}></FontAwesomeIcon>
            <div className='zoom_info'>
              <div className="zoom_info_counter">
                <div className="zoom_info_counter_number">{props.pictureNum}.</div>
                <Spring
                  from={{}}
                  to={{ background: `linear-gradient(to right, white, white ${props.pgnationBG}%, #3f3f3f ${props.pgnationBG}%, #3f3f3f 100%)` }}
                >
                  {propsB => (
                    <div style={propsB} className="zoom_info_counter_line"></div>
                  )}
                </Spring>
                <div className="zoom_info_counter_number">{props.numImages}.</div>
              </div>
              <div className='zoom_info_images-title'>{props.imagesName}</div>
            </div>
          </div>
        </div>
      }
    </Spring>
  );
}

export default Zoom;