import React from 'react'
import { useSpring, animated, config } from 'react-spring'



export default function LoadingScreen() {
  const props = useSpring({
    from: { transform: 'translateX(0px)' },
    to: async next => {
        await next({ transform: 'translateX(-1300px)' })
        await next({ display: 'none' })
    },
    config: config.molasses
  })
  return (
    <animated.div className="loading-screen" style={props}>
      <h1>Loading...</h1> 
    </animated.div> 
  )
}