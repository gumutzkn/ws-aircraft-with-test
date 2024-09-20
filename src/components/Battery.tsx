import React from 'react';

type BatteryType = {
  battery: number;
};

const Battery: React.FC<BatteryType> = ({ battery }) => {
  let bgColor = 'bg-slate-700';

  if (battery > 50) {
    bgColor = 'bg-slate-400';
  } else if (battery > 25) {
    bgColor = 'bg-slate-500';
  } else if (battery <= 25) {
    bgColor = 'bg-slate-700';
  }

  return (
    <div
      id='battery-container'
      data-testid='battery-container'
      className='w-14 h-24 border-2 border-white rounded rotate-180'
      style={{
        animation: battery < 25 ? 'blink 1s infinite' : 'none',
      }}
    >
      <div
        id='inside'
        data-testid='inside'
        className={`w-full h-full ${bgColor} flex flex-col-reverse items-center justify-end`}
        style={{
          height: `${battery}%`,
        }}
      >
        <span className='rotate-180 text-white'>{battery}%</span>
      </div>
    </div>
  );
};

export default Battery;
