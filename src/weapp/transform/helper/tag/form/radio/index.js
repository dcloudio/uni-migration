export default {
  name: 'input',
  beforeAttr (node, {
    getAttr,
    addAttr
  }) {
    if (!node.attributes.name) {
      let name = 'radio-' + new Date().getTime() // 一个group下的radio应该同一个name
      if (node.attributes.dtest === 'test') {
        name = 'test'
      }
      node.attributes.name = name
    }
  },
  afterAttr (node, {
    addAttr
  }) {
    addAttr('type', 'radio')
  },
  attr: { // 标签属性转换配置
    'value': 'value',
    'name': 'name', // 快应用专有的属性
    'checked': 'checked',
    'disabled': 'disabled',
    'color': 'STYLE:color'
  },
  event: {
    'linechange': '',
    'confirm': '',
    'focus': 'focus',
    'blur': 'blur',
    'input': 'change'
  }
}
