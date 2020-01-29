import React, { useState } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

const Zoom = props => {
  const [showControl, setShowControl] = useState(false);
  const [arrowPressed, setArrowPressed] = useState(false);


  const hideControl = () => {
    setArrowPressed(true);
    setTimeout(() => {
      setShowControl(false);
    }, 200);
  };

  const changePicture = direction => {
    props.changePicture(direction);
    hideControl();
  };

  const pgnationBG = (100 / props.numImages) * props.imageNum;

  const handlers = useSwipeable({
    onSwipedRight: _ => props.changePicture('next'),
    onSwipedLeft: _ => props.changePicture('previous'),
    ...config
  });


  return (
    <Spring
      from={{ opacity: 0.85, transform: 'scale(0.98)' }}
      to={{
        opacity: 1,
        transform: 'scale(1)'
      }}
      config={config.stiff}
    >
      {propsA => (
        <div style={propsA} className='zoom'>
          {showControl && (
            <div>
              <FontAwesomeIcon
                className='zoom_arrow zoom_arrow--left'
                icon={faChevronLeft}
                onClick={_ => changePicture('previous')}
              />
              <FontAwesomeIcon
                className='zoom_arrow zoom_arrow--right'
                icon={faChevronRight}
                onClick={_ => changePicture('next')}
              />
            </div>
          )}
          <div
            className='zoom_image'
            onClick={_ => setShowControl(!showControl)}
            {...handlers}
          >
            <img src={props.imgURL} alt=''></img>
            <img
              src={props.imgURL.replace(
                /w_[\d]*/,
                `w_${Math.round(window.innerWidth)}`
              )}
              alt=''
              style={{ zIndex: 1 }}
            />
          </div>
          {!showControl && (
            <div
              className='zoom_hover-box'
              onClick={_ => setShowControl(!showControl)}
              onMouseEnter={_ => {
                if (!arrowPressed) {
                  setShowControl(true);
                } else {
                  setArrowPressed(false);
                }
              }}
            ></div>
          )}
          <Spring
            from={{ opacity: 0, transform: 'translateY(-100%)' }}
            to={{
              opacity: showControl ? 1 : 0,
              transform: showControl ? 'translateY(0%)' : 'translateY(-100%)'
            }}
            config={config.slow}
          >
            {propsC => (
              <div
                style={propsC}
                className='zoom_info'
                onMouseLeave={_ => {
                  !arrowPressed ? setShowControl(false) : setArrowPressed(true);
                }}
              >
                <FontAwesomeIcon
                  onClick={props.exitZoom}
                  className='zoom_x'
                  icon={faTimes}
                ></FontAwesomeIcon>
                <div className='zoom_info_control'>
                  <div className='zoom_info_counter'>
                    <div className='zoom_info_counter_number'>
                      {props.imageNum}.
                    </div>
                    <Spring
                      from={{}}
                      to={{
                        background: `linear-gradient(to right, rgb(28, 123, 187), rgb(28, 123, 187) ${pgnationBG}%, white ${pgnationBG}%, white 100%)`
                      }}
                    >
                      {propsD => (
                        <div
                          style={propsD}
                          className='zoom_info_counter_line'
                        ></div>
                      )}
                    </Spring>
                    <div className='zoom_info_counter_number'>
                      {props.numImages}.
                    </div>
                  </div>
                </div>
                <div className='zoom_info_images-title'>{props.imagesName}</div>
              </div>
            )}
          </Spring>
        </div>
      )}
    </Spring>
  );
};

export default Zoom;
