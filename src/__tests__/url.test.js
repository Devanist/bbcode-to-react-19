import { render } from '@testing-library/react';

import parser from '../index';

describe('[url]', () => {
  it('should parse [url] to react', () => {
    const bbcode = '[url]https://github.com/JimLiu/bbcode-to-react[/url]';
    const { container } = render(parser.toReact(bbcode));
    const wrapper = container.firstChild;

    expect(wrapper.textContent).toBe('https://github.com/JimLiu/bbcode-to-react');
    expect(wrapper.getAttribute('href')).toBe('https://github.com/JimLiu/bbcode-to-react');
  });

  it('should parse [url=url]text[/url] to react', () => {
    const bbcode = '[url=https://github.com/JimLiu/bbcode-to-react]bbcode-to-react[/url]';
    const { container } = render(parser.toReact(bbcode));
    const wrapper = container.firstChild;

    expect(wrapper.textContent).toBe('bbcode-to-react');
    expect(wrapper.getAttribute('href')).toBe('https://github.com/JimLiu/bbcode-to-react');
  });

  it('should parse [email]no.one@domain.adr[/email] to react', () => {
    const bbcode = '[email]no.one@domain.adr[/email]';
    const { container } = render(parser.toReact(bbcode));
    const wrapper = container.firstChild;

    expect(wrapper.textContent).toBe('no.one@domain.adr');
    expect(wrapper.getAttribute('href')).toBe('mailto:no.one@domain.adr');
  });

  it('should parse image link to react', () => {
    const bbcode = '[url=https://github.com/JimLiu/bbcode-to-react]bbcode-to-react][img]logo.png[/img][/url]';
    const { container } = render(parser.toReact(bbcode));
    const wrapper = container.firstChild;

    expect(wrapper.tagName).toBe('A');
    expect(wrapper.getAttribute('href')).toBe('https://github.com/JimLiu/bbcode-to-react');
    const img = wrapper.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe('logo.png');
  });
});
