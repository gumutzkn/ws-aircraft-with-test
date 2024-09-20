import React from 'react';

type ControlPanelType = {
  ws: WebSocket | null;
};

const ControlPanel: React.FC<ControlPanelType> = ({ ws }) => {
  const handleStart = () => {
    if (ws) {
      ws.send('START');
    }
  };

  const handleStop = () => {
    if (ws) {
      ws.send('STOP');
    }
  };

  return (
    <div className='flex'>
      <button
        data-testid='start-button'
        onClick={handleStart}
        className='bg-slate-900 hover:bg-slate-800 uppercase font-semibold text-white px-8 py-2 m-2 rounded'
      >
        Start
      </button>
      <button
        data-testid='stop-button'
        onClick={handleStop}
        className='uppercase border-2 border-white font-semibold text-white px-8 py-2 m-2 rounded'
      >
        Stop
      </button>
    </div>
  );
};

export default ControlPanel;
