import { render } from '@testing-library/react';

import parser from '../index';

describe('create tag that is not case-sensitive', () => {
  it('should parse [b]strong[/b] to react <strong>strong</strong>', () => {
    const { container } = render(parser.toReact('[b]strong[/b]'));

    expect(container.textContent).toBe('strong');
    expect(container.innerHTML).toBe('<strong>strong</strong>');
  });

  it('should parse [B]strong[/B] to react <strong>strong</strong>', () => {
    const { container } = render(parser.toReact('[B]strong[/B]'));

    expect(container.textContent).toBe('strong');
    expect(container.innerHTML).toBe('<strong>strong</strong>');
  });

  it('should parse [B]strong[/b] to react <strong>strong</strong>', () => {
    const { container } = render(parser.toReact('[B]strong[/b]'));

    expect(container.textContent).toBe('strong');
    expect(container.innerHTML).toBe('<strong>strong</strong>');
  });

  it('should NOT parse [c]strong[/c] to react <strong>strong</strong>', () => {
    const { container } = render(parser.toReact('[c]strong[/c]'));

    expect(container.textContent).toBe('[c]strong[/c]');
    expect(container.innerHTML).toBe('[c]strong[/c]');
  });
});
