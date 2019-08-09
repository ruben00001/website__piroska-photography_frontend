import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Zoom = (props) => {
  return (
    <div className='gallery-page_zoom'>
      <div className='gallery-page_zoom_image'>
        <img src={props.zoomedImageURL} alt=''></img>
        <FontAwesomeIcon onClick={props.previousPicture} className='gallery-page_zoom_arrow gallery-page_zoom_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
        <FontAwesomeIcon onClick={props.nextPicture} className='gallery-page_zoom_arrow gallery-page_zoom_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
        <FontAwesomeIcon onClick={props.exitZoom} className='gallery-page_zoom_x' icon={faTimes}></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default Zoom;