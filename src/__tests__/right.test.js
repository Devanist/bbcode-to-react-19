import React from 'react';
import { render } from '@testing-library/react';

import parser from '../index';

describe('[right]', () => {
  it('should parse [right] to react', () => {
    const bbcode = '[right]right[/right]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);
    const el = container.firstChild;

    expect(el.textContent).toBe('right');
    expect(el.style.textAlign).toBe('right');
  });
});
