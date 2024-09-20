import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Speedometer from '../../src/components/Speedometer';

describe('Speedometer Component', () => {
  it('renders the Speedometer component', () => {
    const { container } = render(<Speedometer speed={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays the correct speed', () => {
    const { getByText } = render(<Speedometer speed={75} />);
    expect(getByText('75 km/h')).toBeInTheDocument();
  });

  it('renders the SVG element', () => {
    const { container } = render(<Speedometer speed={30} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('calculates the correct needle position based on speed', () => {
    const { container } = render(<Speedometer speed={60} />);
    const needle = container.querySelector(
      'svg line:last-child'
    ) as HTMLElement;

    const expectedX2 =
      100 + 70 * Math.cos(((60 * 1.8 - 90) * Math.PI) / 180);
    const expectedY2 =
      100 + 70 * Math.sin(((60 * 1.8 - 90) * Math.PI) / 180);

    const needleX2 = Number(needle.getAttribute('x2'));
    const needleY2 = Number(needle.getAttribute('y2'));

    expect(needleX2).toBeCloseTo(expectedX2, 2);
    expect(needleY2).toBeCloseTo(expectedY2, 2);
  });
});
