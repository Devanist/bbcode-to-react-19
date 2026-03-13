import React from 'react';
import { render } from '@testing-library/react';

import parser from '../index';

describe('[quote]', () => {
  it('should parse "[quote]quote[/quote]" to react', () => {
    const bbcode = '[quote]quote[/quote]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);
    const el = container.firstChild;

    expect(el.textContent).toBe('quote');
    expect(el.tagName.toLowerCase()).toBe('blockquote');
  });

  it('should parse quote with author', () => {
    const bbcode = '[quote="Mr. Blobby"]The text Mr. Blobby wrote would go here[/quote]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);
    const el = container.firstChild;

    expect(el.textContent).toBe('Mr. Blobby wrote:The text Mr. Blobby wrote would go here');
    expect(el.tagName.toLowerCase()).toBe('blockquote');
  });
});
