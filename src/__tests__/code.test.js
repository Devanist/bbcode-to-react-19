import { render } from '@testing-library/react';
import React from 'react';

import parser from '../index';

describe('[code]', () => {
  it('should parse "[code=inline][b]strong[/b][/code]" to react', () => {
    const { container } = render(<>{parser.toReact('[code=inline][b]strong[/b][/code]')}</>);

    expect(container.textContent).toBe('[b]strong[/b]');
    expect(container.innerHTML).toBe('<code>[b]strong[/b]</code>');
  });

  it('should parse "[code][b]strong[/b][/code]" to react', () => {
    const { container } = render(<>{parser.toReact('[code][b]strong[/b][/code]')}</>);

    expect(container.textContent).toBe('[b]strong[/b]');
    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    expect(pre.innerHTML).toBe('[b]strong[/b]');
  });
});
