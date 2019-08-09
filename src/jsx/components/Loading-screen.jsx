import React from 'react';
import {Spring, config} from 'react-spring/renderprops';
import CountUp from 'react-countup';

const LoadingScreen = (props) => {
  return (  
    <Spring
      from={{ backgroundColor: '#050505' }}
      to={{ backgroundColor: !props.changeBackground ? '#050505' : '#222222' }}
      config={{ duration: 100 }}
    >
      {props => 
        <div style={props} className='loading-screen'>
          { !this.state.changeBackground &&
            <div className='counter-container'> 
              <CountUp className='counter counter--home' 
                end={100}
                duration={props.duration} 
                useEasing={false}
                // onEnd={({ start }) => {
                //   start(); 
                //   props.animateLoadingText
                // }}
              />
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: props.showLoadingText }}
              >
                {propsB =>
                  <p style={propsB}>Loading</p>
                }
                
              </Spring>
            </div>
          }
        </div>  
      }
    </Spring>
  );
}
 
export default LoadingScreen;

