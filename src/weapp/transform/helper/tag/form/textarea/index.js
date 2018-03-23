export default {
  name: 'textarea',
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
  },
  attr: { // 标签属性转换配置
    'placeholder': 'placeholder', // 提示文本的内容
    'disabled': 'disabled' // 表明当前组件是否可用
  },
  event: {
    'linechange': '',
    'confirm': '',
    'focus': 'focus',
    'blur': 'blur',
    'input': 'change'
  }
}
