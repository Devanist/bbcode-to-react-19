import { render } from '@testing-library/react';

import parser from '../index';

describe('[color]', () => {
  it('should parse [color] to react', () => {
    const bbcode = '[color=red]red[/color]';
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.textContent).toBe('red');
    expect(el.style.color).toBe('red');
  });

  it('should parse rgb color to react', () => {
    const bbcode = '[color=#FF0000]red[/color]';
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.textContent).toBe('red');
    expect(el.style.color).toBe('rgb(255, 0, 0)');
  });
});
