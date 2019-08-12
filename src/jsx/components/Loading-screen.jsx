import React from 'react';
import { Spring, config } from 'react-spring/renderprops';
import LoadingWidget from './Loading-widget';
import { Global } from '../../data/globals'

const LoadingScreen = (props) => {
  return (
    <Spring
      from={{ backgroundColor: 'white' }}
      to={{ backgroundColor: props.changeBackground ? 'white' : `${Global.mainColor}` }}
      config={config.gentle}
    >
      {props =>
        <div style={props} className='loading-screen'>
          {!props.changeBackground &&
            <LoadingWidget />
          }
        </div>
      }
    </Spring>
  );
}

export default LoadingScreen;

