import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './label';

describe('Label test', () => {
  it('Renders correctly', () => {
    render(
      <Label>
        <p>Test</p>
      </Label>,
    );
    expect(screen.getByText('Test', { exact: false })).toBeInTheDocument();
  });
});
