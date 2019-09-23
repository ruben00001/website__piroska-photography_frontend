import React from 'react';
import { Spring, config } from 'react-spring/renderprops';

export const SpringSlideUp = (props) => ( 
  <Spring
    from={{ transform: `translateY(100%)`, opacity: 0 }}
    to={{
      transform: props.showTitles ? 'translateY(0px)' : `translateY(100%)`,
      opacity: props.showTitles ? 1 : 0
    }}
    config={config.slow}
  >
    {propsA =>
      <div style={propsA}> {/* ** how to pass style to props.children? */}
        {props.children}
      </div>
    }
  </Spring>
)
