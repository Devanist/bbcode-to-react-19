import React from 'react';
import { render } from '@testing-library/react';

import parser from '../index';

describe('combine formatting tags', () => {
  it('should parse [color] to react', () => {
    const bbcode = '[size=200][color=red][b]LOOK AT ME![/b][/color][/size]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);
    const el = container.firstChild;

    expect(el.textContent).toBe('LOOK AT ME!');
    expect(el.style.fontSize).toBe('200px');
    const colorNode = el.firstElementChild;
    expect(colorNode.style.color).toBe('red');
    expect(colorNode.firstElementChild.tagName.toLowerCase()).toBe('strong');
  });
});
