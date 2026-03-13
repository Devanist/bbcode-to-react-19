// http://1nfosec4all.blogspot.com/2012/07/bulletin-board-code-bbcode-xss-exploit.html
import React from 'react';
import { render } from '@testing-library/react';

import parser from '../index';

describe('security test', () => {
  it('should not allow [URL] Tag injection', () => {
    const bbcode = '[url]javascript:alert(0)[/url]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);
    const el = container.firstChild;

    // eslint-disable-next-line no-script-url
    expect(el.textContent).toBe('javascript:alert(0)');
    expect(el.tagName).toBeUndefined();
  });

  it('should not allow [COLOR] Tag Injection', () => {
    const bbcode = '[color=#ff0000;font-size:100px;]Got You[/color]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);
    const el = container.firstChild;

    expect(el.textContent).toBe('Got You');
    expect(el.style.color).not.toBe('#ff0000;');
    expect(el.style.fontSize).toBe('');
  });

  it('should not allow [COLOR] Tag Injection', () => {
    const bbcode = '[color=#ff0000;You:expression(alert(String.fromCharCode(88,83,83)));]Got You[/color]';
    const componentToRender = parser.toReact(bbcode);
    const { container } = render(componentToRender);
    const el = container.firstChild;

    // React component should have style prop with color value set to the whole string
    expect(componentToRender[0].props.style.color).toBe('#ff0000;You:expression(alert(String.fromCharCode(88,83,83)));');

    expect(el.textContent).toBe('Got You');
    // Browser will ignore invalid css property value, so style.color will be null
    expect(el.style.color).not.toBe('#ff0000;');
    expect(el.getAttribute('style')).toBeNull();
    expect(el.style.expression).toBeUndefined();
  });

  it('should not allow [FONT] Tag Injection', () => {
    const bbcode = '[font=Impact, Compacta, Chicago, sans-serif;color:red;]Got You[/font]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);

    expect(container.innerHTML).toBe('[font=Impact, Compacta, Chicago, sans-serif;color:red;]Got You[/font]');
  });

  it('should not allow [FONT] Tag Injection', () => {
    const bbcode = '[font=Impact, Compacta, Chicago, sans-serif;You:expression(alert(String.fromCharCode(88,83,83)));]Got You[/font]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);

    expect(container.innerHTML).toBe('[font=Impact, Compacta, Chicago, sans-serif;You:expression(alert(String.fromCharCode(88,83,83)));]Got You[/font]');
  });

  it('should not allow [IMG] Tag Injection', () => {
    const bbcode = '[img]NotExist.png" onerror="alert(String.fromCharCode(88,83,83))[/img]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);
    const img = container.firstChild;

    expect(img.tagName.toLowerCase()).toBe('img');
    expect(img.getAttribute('onerror')).toBeNull();
  });

  it('should not allow [TABLE] Tag Injection', () => {
    const bbcode = '[table cellSpacing="0" cellPadding="0" width="100%"][tbody][tr][td width="*" onmouseover="alert(String.fromCharCode(88,83,83))"]Got You[/td][/tr][/tbody][/table]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);

    const td = container.querySelector('td');
    expect(td.getAttribute('width')).toBe('*');
    expect(td.getAttribute('onmouseover')).toBeNull();
    expect(td.textContent).toBe('Got You');
  });

  it('should not allow Nested Tags Injection', () => {
    const bbcode = '[url]http://www.good.com?[url] onmousemove=javascript:alert(String.fromCharCode(88,83,83));//[/url][/url]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);

    expect(container.querySelectorAll('a').length).toBe(0);
  });

  it('should not allow Nested Tags Injection', () => {
    const bbcode = '[img]http://foo.com/NotExist.png [img] onerror=javascript:alert(String.fromCharCode(88,83,83)) [/img] [/img]';
    const { container } = render(<>{parser.toReact(bbcode)}</>);

    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(1);
    expect(imgs[0].tagName.toLowerCase()).toBe('img');
    expect(imgs[0].getAttribute('onerror')).toBeNull();
  });
});
