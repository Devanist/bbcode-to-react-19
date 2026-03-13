import { render } from '@testing-library/react';

import parser from '../index';

describe('[list]', () => {
  it('should parse [list] to react', () => {
    const bbcode = '[list]list[/list]';
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.textContent).toBe('list');
    expect(el.tagName.toLowerCase()).toBe('ul');
  });

  it('should parse [list=a] to react', () => {
    const bbcode = `[list=a]
[*]The first possible answer
[*]The second possible answer
[*]The third possible answer
[/list]`;
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.tagName.toLowerCase()).toBe('ol');
    expect(container.querySelectorAll('li').length).toBe(3);
    expect(container.querySelector('li').textContent.trim()).toBe('The first possible answer');
    expect(el.style.listStyleType).toBe('lower-alpha');
  });

  it('should parse [list=A] to react', () => {
    const bbcode = `[list=A]
[*]The first possible answer
[*]The second possible answer
[*]The third possible answer
[/list]`;
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.tagName.toLowerCase()).toBe('ol');
    expect(container.querySelectorAll('li').length).toBe(3);
    expect(container.querySelector('li').textContent.trim()).toBe('The first possible answer');
    expect(el.style.listStyleType).toBe('upper-alpha');
  });

  it('should parse [list=i] to react', () => {
    const bbcode = `[list=i]
[*]The first possible answer
[*]The second possible answer
[*]The third possible answer
[/list]`;
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.tagName.toLowerCase()).toBe('ol');
    expect(container.querySelectorAll('li').length).toBe(3);
    expect(container.querySelector('li').textContent.trim()).toBe('The first possible answer');
    expect(el.style.listStyleType).toBe('lower-roman');
  });

  it('should parse [list=I] to react', () => {
    const bbcode = `[list=I]
[*]The first possible answer
[*]The second possible answer
[*]The third possible answer
[/list]`;
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.tagName.toLowerCase()).toBe('ol');
    expect(container.querySelectorAll('li').length).toBe(3);
    expect(container.querySelector('li').textContent.trim()).toBe('The first possible answer');
    expect(el.style.listStyleType).toBe('upper-roman');
  });

  it('should parse [list=1] to react', () => {
    const bbcode = `[list=1]
[*]Go to the shops
[*]Buy a new computer
[*]Swear at computer when it crashes
[/list]`;
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.tagName.toLowerCase()).toBe('ol');
    expect(container.querySelectorAll('li').length).toBe(3);
    expect(container.querySelector('li').tagName.toLowerCase()).toBe('li');
    expect(el.style.listStyleType).toBe('decimal');
  });

  it('should parse [*]item[/*] to react', () => {
    const bbcode = '[*]item[/*]';
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.textContent).toBe('item');
    expect(el.tagName.toLowerCase()).toBe('li');
  });

  it('should parse list with items', () => {
    const bbcode = `[list]
      [*]item1[/*]
      [*]item2[/*]
      [*]item3[/*]
    [/list]`;
    const { container } = render(parser.toReact(bbcode));
    const el = container.firstChild;

    expect(el.tagName.toLowerCase()).toBe('ul');
    expect(container.querySelectorAll('li').length).toBe(3);
    expect(container.querySelector('li').tagName.toLowerCase()).toBe('li');
    expect(container.querySelector('li').textContent).toBe('item1');
  });
});
