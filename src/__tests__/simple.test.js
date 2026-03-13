import { render } from '@testing-library/react';

import parser from '../index';

describe('create simple tag', () => {
  it('should parse [b]strong[/b] to react <strong>strong</strong>', () => {
    const { container } = render(parser.toReact('[b]strong[/b]'));

    expect(container.textContent).toBe('strong');
    expect(container.innerHTML).toBe('<strong>strong</strong>');
  });

  it('should parse nest b', () => {
    const { container } = render(parser.toReact('[b]an inner [b]strong[/b].[/b]'));

    expect(container.textContent).toBe('an inner strong.');
    expect(container.innerHTML).toBe('<strong>an inner <strong>strong</strong>.</strong>');
  });

  it('should parse "[i]italic[/i]"" to react "<em>italic</em>"', () => {
    const { container } = render(parser.toReact('[i]italic[/i]'));

    expect(container.textContent).toBe('italic');
    expect(container.innerHTML).toBe('<em>italic</em>');
  });

  it('should parse "[h1]header1[/h1]"" to react "<h1>header1</h1>"', () => {
    const { container } = render(parser.toReact('[h1]header1[/h1]'));

    expect(container.textContent).toBe('header1');
    expect(container.innerHTML).toBe('<h1>header1</h1>');
  });

  it('should parse table to react', () => {
    const bbcode = `[table]
        [tbody]
          [tr]
            [td]1.1[/td]
            [td]1.2[/td]
          [/tr]
        [/tbody]
      [/table]`;
    const { container } = render(parser.toReact(bbcode));

    expect(container.textContent).toBe('1.11.2');
    expect(container.innerHTML).toBe('<table><tbody><tr><td>1.1</td><td>1.2</td></tr></tbody></table>');
  });

  it('should not render text with DISCARD_TEXT option', () => {
    const { container } = render(parser.toReact('[table]italic[/table]'));

    expect(container.textContent).toBe('');
    expect(container.innerHTML).toBe('<table></table>');
  });

  it('should strip outer with STRIP_OUTER option', () => {
    const bbcode = `[h1]header[/h1]
newline`;
    const { container } = render(parser.toReact(bbcode));

    expect(container.textContent).toBe('headernewline');
    expect(container.innerHTML).toBe('<h1>header</h1>newline');
  });

  it('should not strip outer with STRIP_OUTER option', () => {
    const bbcode = `[b]strong[/b]
newline`;
    const { container } = render(parser.toReact(bbcode));

    expect(container.textContent).toBe('strong\nnewline');
    expect(container.innerHTML).toBe('<strong>strong</strong>\nnewline');
  });
});
