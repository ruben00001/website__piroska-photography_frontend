import React from 'react'
import { useSpring, config, animated, interpolate } from "react-spring";

function NavbarToggler(props) {
  const [toggle, setToggle] = React.useState(false);

  const p1 = useSpring({
    s: toggle ? 45 : 0,
    config: config.stiff
  });

  const p2 = useSpring({
    y: toggle ? 3.75 : 0,
    config: config.stiff
  });

  const p3 = useSpring({
    c: props.white ? 'white' : toggle ? 'white' : 'black',
    config: config.molasses
  });

  return (
    <div className='navbar_toggler'
      onClick={() => { setToggle(prev => !prev); props.onClick() }}
    >
      <animated.div
        className="navbar_toggler_line navbar_toggler_line--1"
        style={{
          transform: interpolate([p1.s, p2.y], (s, y) => {
            return `translate(0, ${y}px) rotate(${s}deg)`;
          }),
          backgroundColor: p3.c
        }}
      />
      <animated.div
        className="navbar_toggler_line navbar_toggler_line--2"
        style={{
          transform: interpolate([p1.s, p2.y], (s, y) => {
            return `translate(0, ${-y}px) rotate(${-s}deg)`;
          }),
          backgroundColor: p3.c
        }}
      />
    </div>
  );
}

export default NavbarToggler;