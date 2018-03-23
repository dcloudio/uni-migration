export default {
  name: 'input',
  content: 'value',
  beforeAttr (node, {
    getAttr
  }) {
    if (~getAttr('placeholder-style', '').indexOf('color')) {
      if (node.attributes.style) {
        node.attributes.style = node.attributes.style + 'placeholder-color' + getAttr('placeholder-style').split('color')[1].split(';')[0] + ';'
      } else {
        node.attributes.style = 'placeholder-color' + getAttr('placeholder-style').split('color')[1].split(';')[0] + ';'
      }
    }
    if (getAttr('password') || getAttr('password') === '') {
      node.attributes.type = 'password'
    }
    if (getAttr('type') === 'idcard' || getAttr('type') === 'digit') {
      node.attributes.type = 'number'
    }
  },
  attr: {
    'value': 'value',
    'type': 'type',
    'placeholder': 'placeholder',
    'disabled': 'disabled'
  },
  event: {
    'input': 'change',
    'focus': 'focus',
    'blur': 'blur',
    'confirm': ''
  }
}
