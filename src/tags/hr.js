// https://github.com/vishnevskiy/bbcodejs/blob/master/src/coffee/tags.coffee
import React from 'react';
import Tag from '../tag';

export default class HorizontalRuleTag extends Tag {
  constructor(renderer, settings = {}) {
    super(renderer, settings);
    this.SELF_CLOSE = true;
    this.STRIP_OUTER = true;
  }

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return '<hr />';
  }

  // eslint-disable-next-line class-methods-use-this
  toReact() {
    return <hr />;
  }
}
