import React from 'react';

import planeSvg from '../assets/airplane.svg';

type PlaneType = {
  angle: number;
};

const Plane: React.FC<PlaneType> = ({ angle }) => {
  return (
    <div
      data-testid='plane'
      className='w-full h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-no-repeat bg-contain'
      style={{
        backgroundImage: `url(${planeSvg})`,
        transform: `rotate(${angle}deg)`,
      }}
    ></div>
  );
};

export default Plane;
