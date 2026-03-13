import React from 'react';
import { render } from '@testing-library/react';

import parser from '../index';

describe('[size]', () => {
  it('should parse [size] to react', () => {
    const bbcode = '[size=5]size5[/size]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);

    const el = container.firstChild;
    expect(el.textContent).toBe('size5');
    expect(el.style.fontSize).toBe('5px');
  });
});
