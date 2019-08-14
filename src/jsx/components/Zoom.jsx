import React from 'react';
import {Spring} from 'react-spring/renderprops';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Zoom = (props) => {
  return (
    <div className='zoom'>
      <div className='zoom_image'>
        <img src={props.zoomedImageURL} alt=''></img>
        <FontAwesomeIcon onClick={props.previousPicture} className='zoom_arrow zoom_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
        <FontAwesomeIcon onClick={props.nextPicture} className='zoom_arrow zoom_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
        <FontAwesomeIcon onClick={props.exitZoom} className='zoom_x' icon={faTimes}></FontAwesomeIcon>
        <div className="page-counter">
          <div className="page-counter__number">{props.pictureNum}.</div>
          <Spring
            from={{}}
            to={{ background: `linear-gradient(to right, white, white ${props.pgnationBG}%, #3f3f3f ${props.pgnationBG}%, #3f3f3f 100%)` }}
          >
            {props => (
              <div style={props} className="page-counter__line"></div>
            )}
          </Spring>
          <div className="page-counter__number">{props.numImages}.</div>
        </div>
      </div>
    </div>
  );
}

export default Zoom;