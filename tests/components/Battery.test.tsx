import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Battery from '../../src/components/Battery';

describe('Battery Component', () => {
  it('renders the correct battery percentage', () => {
    const { getByText } = render(<Battery battery={25} />);
    expect(getByText('25%')).toBeInTheDocument();
  });

  it('applies blink animation style when battery is less than 25', () => {
    const { container } = render(<Battery battery={20} />);
    const containerElement = container.querySelector(
      '#battery-container'
    ) as HTMLElement;
    expect(containerElement.style.animation).toBe(
      'blink 1s infinite'
    );
  });

  it('does not apply blink animation when battery is 25 or more', () => {
    const { container } = render(<Battery battery={25} />);
    const containerElement = container.querySelector(
      '#battery-container'
    ) as HTMLElement;
    expect(containerElement.style.animation).toBe('none');
  });

  it('renders the battery container element', () => {
    const { container } = render(<Battery battery={50} />);
    const containerElement = container.querySelector(
      '#battery-container'
    );
    expect(containerElement).toBeInTheDocument();
  });
});
