import {
  ESCAPE_RE,
  ESCAPE_DICT,
  URL_RE,
  COSMETIC_DICT,
  COSMETIC_RE,
} from './constants';

export default class Renderer {
  constructor(options) {
    this.options = { linkify: false, ...options };
    this.contexts = [];
  }

  context(context, func) {
    const newOptions = { ...this.options, ...context };
    this.contexts.push(this.options);
    this.options = newOptions;
    const v = func();
    this.options = this.contexts.pop();
    return v;
  }

  // eslint-disable-next-line class-methods-use-this
  escape(value) {
    // Escapes a string so it is valid within XML or XHTML
    return value.replace(ESCAPE_RE, (match) => ESCAPE_DICT[match]);
  }

  // eslint-disable-next-line class-methods-use-this
  linkify(value) {
    return value.replace(URL_RE, (...match) => {
      const url = match[1];
      const proto = match[2];

      if (proto && ['http', 'https'].indexOf(proto) === -1) {
        return url; // bad protocol, no linkify
      }

      const href = proto ? url : `http://${url}`;

      return `<a href="${href}" target="_blank">${url}</a>`;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  strip(text) {
    return text.replace(/^\s+|\s+$/g, '');
  }

  // eslint-disable-next-line class-methods-use-this
  cosmeticReplace(value) {
    return value.replace(COSMETIC_RE, (...match) => {
      const item = match[0];
      return COSMETIC_DICT[item] || item;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  htmlAttributes(attributes) {
    if (!attributes) {
      return '';
    }

    return Object.keys(attributes).map((k) => `${k}="${attributes[k]}"`).join(' ');
  }
}
