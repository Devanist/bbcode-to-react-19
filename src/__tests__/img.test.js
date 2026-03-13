import React from 'react';
import { render } from '@testing-library/react';

import parser from '../index';

describe('[img]', () => {
  it('should parse "[img]logo.png[/img]" to react', () => {
    const { container } = render(<>{parser.toReact('[img]logo.png[/img]')}</>);
    const img = container.firstChild;

    expect(img.textContent).toBe('');
    expect(img.tagName.toLowerCase()).toBe('img');
    expect(img.getAttribute('src')).toBe('logo.png');
  });

  it('should has width and height "[img width="640" height="480"]logo.png[/img]" to react', () => {
    const { container } = render(<>{parser.toReact('[img width="640" height="480"]logo.png[/img]')}</>);
    const img = container.firstChild;

    expect(img.textContent).toBe('');
    expect(img.tagName.toLowerCase()).toBe('img');
    expect(img.getAttribute('src')).toBe('logo.png');
    expect(img.getAttribute('width')).toBe('640');
    expect(img.getAttribute('height')).toBe('480');
  });
});
