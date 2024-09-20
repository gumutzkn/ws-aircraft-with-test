import React from 'react';
import { useEffect, useState } from 'react';

import {
  Battery,
  ControlPanel,
  Plane,
  Speedometer,
  StarsBackground,
} from './components';

const WS_URL = import.meta.env.VITE_WS_URL;

const App: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [speed, setSpeed] = useState(0);
  const [angle, setAngle] = useState(0);
  const [battery, setBattery] = useState(100);

  useEffect(() => {
    const websocket = new WebSocket(WS_URL);

    websocket.onopen = () => {
      console.log('Websocket connected');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.eventName) {
        case 'PLANE_ANGLE':
          setAngle(data.data.angle);
          break;
        case 'PLANE_SPEED':
          setSpeed(data.data.speed);
          break;
        case 'PLANE_BATTERY':
          setBattery(data.data.battery);
          break;
        default:
          break;
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      setWs(null);
    };

    // Added cleanup function to close the websocket connection
    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <StarsBackground />
      <div className='flex h-full justify-center items-center z-10'>
        <div className='flex flex-col md:flex-row gap-44'>
          <Plane angle={angle} />
          <div className='flex flex-col justify-between items-center'>
            <Battery battery={battery} />
            <Speedometer speed={speed} />
            <ControlPanel ws={ws} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
