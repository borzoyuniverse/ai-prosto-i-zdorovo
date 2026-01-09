import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Toggle } from './toggle';

describe('Toggle Component', () => {
  it('renders correctly with default props', () => {
    render(<Toggle>Toggle me</Toggle>);
    const toggle = screen.getByRole('button', { name: /toggle me/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveTextContent('Toggle me');
    expect(toggle).toHaveAttribute('type', 'button');
  });

  it('renders correctly with "primary" variant', () => {
    render(
      <Toggle variant="primary">
        <span role="img" aria-label="icon">
          🌟
        </span>
      </Toggle>,
    );
    const toggle = screen.getByRole('button', { name: /icon/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).not.toHaveTextContent('Toggle me');
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    render(<Toggle onClick={onClick}>Click me</Toggle>);
    const toggle = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(toggle);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('toggles state correctly', () => {
    render(<Toggle>Toggle State</Toggle>);
    const toggle = screen.getByRole('button', { name: /toggle state/i });

    // Initial state
    expect(toggle).toHaveAttribute('data-state', 'off');

    // Simulate state change
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('data-state', 'on');
  });

  it('supports custom classes', () => {
    render(<Toggle className="custom-class">Custom Class</Toggle>);
    const toggle = screen.getByRole('button', { name: /custom class/i });
    expect(toggle).toHaveClass('custom-class');
  });
});
