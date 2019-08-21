import React, { useState } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// import { Global } from '../../data/globals';

const Zoom = (props) => {

  const [showControl, setShowControl] = useState(false);

  return (
    <Spring
      from={{ opacity: 0.85, transform: 'scale(0.95)' }}
      to={{
        opacity: 1,
        transform: 'scale(1)'
      }}
      config={config.stiff}
    >
      {propsA =>
        <div style={propsA} className='zoom'>
          <div className='zoom_image'
            onClick={_ => setShowControl(!showControl)}
          >
            <img src={props.zoomedImageURL} alt=''></img>
          </div>
          {!showControl &&
            <div className='zoom_hover-box'
              onMouseEnter={_ => setShowControl(true)}
            ></div>
          }
          <Spring
            from={{ opacity: 0, transform: 'translateY(-100%)' }}
            to={{
              opacity: showControl ? 1 : 0,
              transform: showControl ? 'translateY(0%)' : 'translateY(-100%)'
            }}
            config={config.slow}
          >
            {propsB =>
              <div style={propsB} className='zoom_info'
                onMouseLeave={_ => setShowControl(false)}
              >
                <FontAwesomeIcon onClick={props.exitZoom} className='zoom_x' icon={faTimes}></FontAwesomeIcon>
                <div className='zoom_info_control'>
                  <FontAwesomeIcon onClick={props.previousPicture} className='zoom_arrow zoom_arrow--left' icon={faChevronLeft}></FontAwesomeIcon>
                  <div className="zoom_info_counter">
                    <div className="zoom_info_counter_number">0{props.pictureNum}.</div>
                    <Spring
                      from={{}}
                      to={{ background: `linear-gradient(to right, rgb(28, 123, 187), rgb(28, 123, 187) ${props.pgnationBG}%, white ${props.pgnationBG}%, white 100%)` }}
                    >
                      {propsB => (
                        <div style={propsB} className="zoom_info_counter_line"></div>
                      )}
                    </Spring>
                    <div className="zoom_info_counter_number">0{props.numImages}.</div>
                  </div>
                  <FontAwesomeIcon onClick={props.nextPicture} className='zoom_arrow zoom_arrow--right' icon={faChevronRight}></FontAwesomeIcon>
                </div>
                <div className='zoom_info_images-title'>{props.imagesName}</div>
              </div>
            }
          </Spring>
        </div>
      }
    </Spring>
  );
}

export default Zoom;