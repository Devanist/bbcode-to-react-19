import { render } from '@testing-library/react';

import parser from '../index';

describe('[hr]', () => {
  it('should parse [hr] to react', () => {
    const { container } = render(parser.toReact('[hr]'));

    expect(container.textContent).toBe('');
    expect(container.querySelector('hr')).not.toBeNull();
  });
});
