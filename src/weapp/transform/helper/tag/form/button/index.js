export default {
  name: 'input',
  content: 'value', // 如果input标签内部直接跟文本,则将文本转换为value属性值
  beforeAttr (node, {
    getAttr,
    addClass
  }) {
    // 处理size、type、plain属性。
    let typeClass = 'u-w-button-' + getAttr('type', 'default')
    if (getAttr('plain', false)) {
      typeClass += '-plain'
    }
    addClass(typeClass)
    //  addClass('u-w-button-' + getAttr('type', 'default'))
    // 这里type和size的值有可能一样，所以忽略尺寸的default。
    if (getAttr('size', 'default') !== 'default') {
      addClass('u-w-button-' + getAttr('size', 'default'))
    }
    // disabled通过伪类选择器处理
  },
  afterAttr (node, {
    addAttr
  }) {
    addAttr('type', 'button') // 为input动态增加type:button
  },
  attr: {
    'disabled': 'disabled',
    'form-type': 'E:',
    'open-type': 'E:',
    'app-parameter': 'E:',
    'session-from': 'E:',
    'send-message-title': 'E:',
    'send-message-path': 'E:',
    'send-message-img': 'E:'
  },
  event: {

  }
}
