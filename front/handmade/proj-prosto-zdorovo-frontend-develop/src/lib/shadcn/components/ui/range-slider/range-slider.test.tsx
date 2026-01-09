import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RangeSlider } from './range-slider';

globalThis.ResizeObserver =
  globalThis.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

describe('Range slider test', () => {
  it('Renders correctly', () => {
    const { getByRole } = render(<RangeSlider max={2000} min={0} value={[228, 1488]} />);
    expect(
      getByRole('slider', {
        value: { now: 1488, min: 0, max: 2000 },
      }),
    ).toBeInTheDocument();
  });
});
