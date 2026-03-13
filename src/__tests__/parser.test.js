import { render } from '@testing-library/react';
import parser from '../index';

describe('Parser additional tests', () => {
  it('renders nested tags text correctly', () => {
    const { container } = render(parser.toReact('[b][i]Nested[/i][/b]'));
    expect(container.textContent).toBe('Nested');
  });

  it('renders links with correct href', () => {
    const { container } = render(parser.toReact('[url=https://example.com]Example[/url]'));
    const a = container.querySelector('a');
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toContain('https://example.com');
  });

  it('renders images with correct src', () => {
    const { container } = render(parser.toReact('[img]http://example.com/a.png[/img]'));
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe('http://example.com/a.png');
  });

  it('leaves unknown tags as raw text', () => {
    const { container } = render(parser.toReact('[foo]bar[/foo]'));
    expect(container.textContent).toContain('[foo]bar[/foo]');
  });

  it('should parse bbcode to react', () => {
    const bbcode = '[b]strong[/b]';
    const { container } = render(parser.toReact(bbcode));

    expect(container.textContent).toBe('strong');
    expect(container.innerHTML).toBe('<strong>strong</strong>');
  });

  it('should encode html', () => {
    const bbcode = '[b]<strong>strong</strong>[/b]';
    const { container } = render(parser.toReact(bbcode));

    expect(container.textContent).toBe('<strong>strong</strong>');
    expect(container.innerHTML).toBe('<strong>&lt;strong&gt;strong&lt;/strong&gt;</strong>');
  });
});
