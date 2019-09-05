import React, { useState } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { useSwipeable } from 'react-swipeable'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// import { Global } from '../../data/globals';

const Zoom = (props) => {

  const [showControl, setShowControl] = useState(false);
  const [arrowPressed, setArrowPressed] = useState(false);

  const hideControl = () => {
    setArrowPressed(true); setTimeout(() => { setShowControl(false) }, 200)
  }

  const nextPicture = () => {
    props.nextPicture(); hideControl();
  }

  const previousPicture = () => {
    props.previousPicture(); hideControl();
  }

  const handlers = useSwipeable({
    onSwipedRight: _ => nextPicture(),
    onSwipedLeft: _ => previousPicture(),
    ...config
  })

  return (
    <Spring
      from={{ opacity: 0.85, transform: 'scale(0.98)' }}
      to={{
        opacity: 1,
        transform: 'scale(1)'
      }}
      config={config.stiff}
    >
      {propsA =>
        <div style={propsA} className='zoom'>
          <Spring
            from={{ opacity: 0 }}
            to={{
              opacity: showControl ? 1 : 0,
            }}
            config={config.slow}
          >
            {propsB =>
              <div style={propsB}>
                <FontAwesomeIcon className='zoom_arrow zoom_arrow--left' icon={faChevronLeft}
                  onClick={_ => previousPicture() }
                ></FontAwesomeIcon>
                <FontAwesomeIcon className='zoom_arrow zoom_arrow--right' icon={faChevronRight}
                  onClick={_ => nextPicture() }
                ></FontAwesomeIcon>
              </div>
            }
          </Spring>

          <div className='zoom_image'
            onClick={_ => setShowControl(!showControl)}
            {...handlers}
          >

            <img src={props.zoomedImageURL} alt=''></img>
          </div>
          {!showControl &&
            <div className='zoom_hover-box'
              onClick={_ => setShowControl(!showControl)}
              onMouseEnter={_ => {
                if (!arrowPressed) {
                  setShowControl(true);
                } else {
                  setArrowPressed(false);
                }
              }}
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
                onMouseLeave={_ => {
                  if (!arrowPressed) {
                    setShowControl(false);
                  } else {
                    setArrowPressed(true);
                  }
                }}

              >
                <FontAwesomeIcon onClick={props.exitZoom} className='zoom_x' icon={faTimes}></FontAwesomeIcon>
                <div className='zoom_info_control'>
                  <div className="zoom_info_counter">
                    <div className="zoom_info_counter_number">{props.pictureNum}.</div>
                    <Spring
                      from={{}}
                      to={{ background: `linear-gradient(to right, rgb(28, 123, 187), rgb(28, 123, 187) ${props.pgnationBG}%, white ${props.pgnationBG}%, white 100%)` }}
                    >
                      {propsB => (
                        <div style={propsB} className="zoom_info_counter_line"></div>
                      )}
                    </Spring>
                    <div className="zoom_info_counter_number">{props.numImages}.</div>
                  </div>
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