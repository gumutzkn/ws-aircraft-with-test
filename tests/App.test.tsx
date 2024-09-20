import React from 'react';

import {
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterEach,
} from 'vitest';
import '@testing-library/jest-dom/vitest';

import App from '../src/App';

describe('App Component', () => {
  let mockWebSocket: any;

  beforeAll(() => {
    mockWebSocket = {
      onopen: null as null | (() => void),
      onmessage: null as null | ((event: MessageEvent) => void),
      onclose: null as null | (() => void),
      send: vi.fn(),
      close: vi.fn(),
    };

    global.WebSocket = vi.fn(() => mockWebSocket) as any;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the App component', () => {
    render(<App />);
    expect(screen.getByTestId('plane')).toBeInTheDocument();
  });

  it('updates angle state on PLANE_ANGLE event', async () => {
    render(<App />);

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        eventName: 'PLANE_ANGLE',
        data: { angle: 45 },
      }),
    });

    if (mockWebSocket.onmessage) {
      mockWebSocket.onmessage(messageEvent);
    }

    await waitFor(() => {
      expect(screen.getByTestId('plane')).toHaveStyle({
        transform: 'rotate(45deg)',
      });
    });
  });

  it('updates speed state on PLANE_SPEED event', async () => {
    render(<App />);

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        eventName: 'PLANE_SPEED',
        data: { speed: 60 },
      }),
    });

    if (mockWebSocket.onmessage) {
      mockWebSocket.onmessage(messageEvent);
    }

    await waitFor(() => {
      expect(screen.getByText('60 km/h')).toBeInTheDocument();
    });
  });

  it('updates battery state on PLANE_BATTERY event', async () => {
    render(<App />);

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({
        eventName: 'PLANE_BATTERY',
        data: { battery: 80 },
      }),
    });

    if (mockWebSocket.onmessage) {
      mockWebSocket.onmessage(messageEvent);
    }

    await waitFor(() => {
      expect(screen.getByText('80%')).toBeInTheDocument();
    });
  });

  it('closes WebSocket connection on unmount', () => {
    const { unmount } = render(<App />);

    unmount();

    expect(mockWebSocket.close).toHaveBeenCalled();
  });
});
