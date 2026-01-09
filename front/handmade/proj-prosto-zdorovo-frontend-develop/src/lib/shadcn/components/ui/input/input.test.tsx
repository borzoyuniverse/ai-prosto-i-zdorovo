import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { expect, it } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('renders correctyly', () => {
    render(<Input defaultValue={20} />);
    expect(screen.getByDisplayValue('20', { exact: false })).toBeInTheDocument();
  });
});
