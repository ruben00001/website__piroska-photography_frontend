import React from 'react';
import { Spring, config } from 'react-spring/renderprops';
import LoadingWidget from './Loading-widget';

const LoadingScreen = (props) => {
  return (
    <div className='loading-screen'>
      <div className='x' >
        <Spring
          from={{ opacity: 0, transform: 'translateY(0px)' }}
          to={{
            opacity: 1,
            transform: props.loadingWidgetOut ? 'translateY(0px)' : 'translateY(-100px)'
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
    </div>
  );
}

export default LoadingScreen;

