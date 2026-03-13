/* eslint-disable max-classes-per-file */
import React from 'react';
import { render } from '@testing-library/react';

import parser, { Tag } from '../index';

class YoutubeTag extends Tag {
  toReact() {
    // using this.getContent(true) to get it's inner raw text.
    const attributes = {
      src: this.getContent(true),
      width: this.params.width || 420,
      height: this.params.height || 315,
    };

    return (
      // eslint-disable-next-line jsx-a11y/iframe-has-title
      <iframe
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...attributes}
        frameBorder="0"
        allowFullScreen
      />
    );
  }
}

class BoldTag extends Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return (
      <b>{this.getComponents()}</b>
    );
  }
}

parser.registerTag('youtube', YoutubeTag); // add new tag
parser.registerTag('b', BoldTag); // replace exists tag

describe('customize tag', () => {
  it('should parse customize youtube tag to react', () => {
    const bbcode = '[youtube width="400"]https://www.youtube.com/watch?v=AB6RjNeDII0[/youtube]';
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.textContent).toBe('');
    expect(el.tagName.toLowerCase()).toBe('iframe');
    expect(el.getAttribute('src')).toBe('https://www.youtube.com/watch?v=AB6RjNeDII0');
    expect(el.getAttribute('width')).toBe('400');
    expect(el.getAttribute('height')).toBe('315');
    expect(el.getAttribute('frameborder')).toBe('0');
    expect(el.hasAttribute('allowfullscreen')).toBe(true);
  });

  it('should replace the exist tag', () => {
    const bbcode = '[b]strong[/b]';
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.textContent).toBe('strong');
    expect(el.tagName.toLowerCase()).toBe('b');
    expect(container.innerHTML).toBe('<b>strong</b>');
  });
});
