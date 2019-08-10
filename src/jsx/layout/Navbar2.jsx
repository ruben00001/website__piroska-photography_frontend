import React from 'react'
import { useSpring, config, animated, interpolate } from "react-spring";

function Navbar2() {
  const [toggle, setToggle] = React.useState(false);

  const p1 = useSpring({
    s: toggle ? 45 : 0,
    config: config.wobbly
  });

  const p2 = useSpring({
    y: toggle ? 3.75 : 0,
    config: config.stiff
  });

  return (
    <div className='navbar' onClick={() => setToggle(prev => !prev)}>
      <div className='navbar_toggler'>
        <animated.div
          className="navbar_toggler_line navbar_toggler_line--1"
          style={{
            transform: interpolate([p1.s, p2.y], (s, y) => {
              return `translate(0, ${y}px) rotate(${s}deg)`;
            })
          }}
        />
        <animated.div
          className="navbar_toggler_line navbar_toggler_line--2"
          style={{
            transform: interpolate([p1.s, p2.y], (s, y) => {
              return `translate(0, ${-y}px) rotate(${-s}deg)`;
            })
          }}
        />
      </div>
    </div>
  );
}

export default Navbar2;