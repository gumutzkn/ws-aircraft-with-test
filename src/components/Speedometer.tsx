import React from 'react';

export type SpeedometerType = {
  speed: number;
};

const Speedometer: React.FC<SpeedometerType> = ({ speed }) => {
  return (
    <div className='relative w-40 h-40'>
      <svg
        className='absolute w-full h-full'
        viewBox='0 0 200 200'
        xmlns='http://www.w3.org/2000/svg'
      >
        {/* Speedometer Circle */}
        <circle
          cx='100'
          cy='100'
          r='90'
          fill='none'
          stroke='white'
          strokeWidth='10'
        />
        {/* Speedometer Ticks */}
        {[...Array(11)].map((_, i) => {
          const angle = i * 18 - 90; // 180 dereceyi 10 adımda bölmek için
          const x1 = 100 + 80 * Math.cos((angle * Math.PI) / 180);
          const y1 = 100 + 80 * Math.sin((angle * Math.PI) / 180);
          const x2 = 100 + 90 * Math.cos((angle * Math.PI) / 180);
          const y2 = 100 + 90 * Math.sin((angle * Math.PI) / 180);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke='white'
              strokeWidth='2'
            />
          );
        })}
        {/* Speedometer Needle */}
        <line
          x1='100'
          y1='100'
          x2={
            100 + 70 * Math.cos(((speed * 1.8 - 90) * Math.PI) / 180)
          }
          y2={
            100 + 70 * Math.sin(((speed * 1.8 - 90) * Math.PI) / 180)
          }
          stroke='white'
          strokeWidth='3'
        />
      </svg>
      <div
        className='absolute w-full text-center text-white font-bold'
        style={{ top: '100px' }}
      >
        {speed} km/h
      </div>
    </div>
  );
};

export default Speedometer;
