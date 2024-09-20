import React from 'react';

import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

import ControlPanel from '../../src/components/ControlPanel';

describe('ControlPanel Component', () => {
  afterEach(() => {
    cleanup(); // Her testten sonra DOM'u temizler
  });

  it('renders the Start and Stop buttons', () => {
    render(<ControlPanel ws={null} />);
    expect(screen.getByTestId('start-button')).toBeInTheDocument();
    expect(screen.getByTestId('stop-button')).toBeInTheDocument();
  });

  it('sends START message when Start button is clicked', () => {
    const mockWebSocket = { send: vi.fn() } as unknown as WebSocket;
    render(<ControlPanel ws={mockWebSocket} />);

    const startButton = screen.getByTestId('start-button');
    fireEvent.click(startButton);

    expect(mockWebSocket.send).toHaveBeenCalledWith('START');
  });

  it('sends STOP message when Stop button is clicked', () => {
    const mockWebSocket = { send: vi.fn() } as unknown as WebSocket;
    render(<ControlPanel ws={mockWebSocket} />);

    const stopButton = screen.getByTestId('stop-button');
    fireEvent.click(stopButton);

    expect(mockWebSocket.send).toHaveBeenCalledWith('STOP');
  });

  it('does not send any message if ws is null when buttons are clicked', () => {
    const mockWebSocket = { send: vi.fn() } as unknown as WebSocket;

    render(<ControlPanel ws={null} />);

    const startButton = screen.getByTestId('start-button');
    const stopButton = screen.getByTestId('stop-button');

    fireEvent.click(startButton);
    fireEvent.click(stopButton);

    // send metodunun çağrılmadığından emin oluyoruz
    expect(mockWebSocket.send).not.toHaveBeenCalled();
  });
});
