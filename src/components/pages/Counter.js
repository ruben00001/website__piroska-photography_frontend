import React from 'react';
import { useCountUp } from 'react-countup';
 
const Counter = () => {
  const { countUp, start, pauseResume, reset, update } = useCountUp({
    start: 0,
    end: 123,
    duration: 5,
    reset: () => null
    
  });
  return (
      <div className='counter'>{countUp}</div>
  );
};

export default Counter