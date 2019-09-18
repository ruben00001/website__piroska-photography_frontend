import React, { useState } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import Loader from 'react-loader-spinner';
import LoadingWidget from './Loading-widget';
import { Global } from '../../data/globals';

const LoadingScreen = (props) => {

  const [showText, setShowText] = useState(false);

  setInterval(() => {
    setShowText(true);
    setTimeout(() => {
      setShowText(false);
    }, 1500);
  }, 15000);

  return (
    <Spring
      from={{ display: 'block' }}
      to={{
        display: props.removeLoader ? 'none' : 'block'
      }}
    >
      {propsA =>
        <div style={propsA}>
          <div className='loading-screen' >
            <Spring
              from={{ opacity: 0, transform: 'translateY(0%)', display: 'flex' }}
              to={{
                opacity: 1,
                transform: props.loadingWidgetOut ? 'translateY(0%)' : 'translateY(-100%)',
                display: props.removeLoader ? 'none' : 'flex'
              }}
              config={config.slow}
            >
              {propsA =>
                <div style={propsA}>
                  <LoadingWidget
                    stopLoader={props.stopLoader}
                  />
                </div>
              }
            </Spring>
          </div>
          <Spring
            from={{ opacity: 0 }}
            to={{
              opacity: showText ? 1 : 0
            }}
            config={config.slow}
          >
            {propsA =>
              <div style={propsA} className='loading-screen_loading'>
                <h3>loading</h3>
                <Loader
                  type="TailSpin"
                  color={Global.mainColor}
                  height={20}
                  width={20}
                />
              </div>
            }
          </Spring>
        </div>
      }
    </Spring>


  );
}

export default LoadingScreen;

