import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Plane from '../../src/components/Plane';

describe('Plane Component', () => {
  it('renders the Plane component', () => {
    const { container } = render(<Plane angle={45} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies the correct rotation based on the angle prop', () => {
    const { container } = render(<Plane angle={90} />);
    const planeElement = container.firstChild as HTMLElement;
    expect(planeElement).toHaveStyle(`transform: rotate(90deg)`);
  });
});
