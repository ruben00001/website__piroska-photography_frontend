import React from 'react';
import LoadingWidget from '../components/Loading-widget';
import { Spring, config } from 'react-spring/renderprops';
import Loader from 'react-loader-spinner';
import { Global } from '../../data/globals';

export const LoadingScreen = (props) => {

  return (
    <>
      <div className='loading-screen'>
        <Spring
          from={{ transform: 'translateY(100%)' }}
          to={{ transform: !props.removeLoadingWidget ? 'translateY(0%)' : 'translateY(-100%)' }}
          config={config.slow}
        >
          {props =>
            <div style={props}>
              <LoadingWidget
                stopLoadingWidget={props.stopLoadingWidget}
              />
            </div>
          }
        </Spring>
      </div>
      <Spring
        from={{ opacity: 0 }}
        to={{
          opacity: props.showLoadingReminder ? 1 : 0
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
    </>
  )
}
