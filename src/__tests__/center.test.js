import { render } from '@testing-library/react';

import parser from '../index';

describe('[center]', () => {
  it('should parse [center] to react', () => {
    const bbcode = '[center]Hello World[/center]';
    const { container } = render(parser.toReact(bbcode));
    const div = container.querySelector('div');

    expect(div).not.toBeNull();
    expect(div.style.textAlign).toBe('center');
    expect(div.textContent).toBe('Hello World');
  });
});
