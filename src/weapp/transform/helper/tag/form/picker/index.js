export default {
  name: 'picker',
  beforeAttr (node, {
    getAttr,
    addClass
  }) {
    if (node.children) { // 清空
      node.children.splice(0, node.children.length)
    }
    if (!node.attributes.mode || node.attributes.mode === 'selector') {
      node.attributes.mode = 'text'
      const arr = node.attributes.range.replace(/\}|\{/ig, '')
      const index = node.attributes.value.replace(/\}|\{/ig, '')
      node.attributes.value = '{{' + arr + '[' + index + ']}}'
    }
    if (node.attributes.mode === 'multiSelector' || node.attributes.mode === 'region') { // 这两个是不支持的，暂时这样处理把
      node.attributes.mode = 'text'
    }
  },
  attr: {
    'mode': 'type',
    'start': 'start',
    'end': 'end',
    'range': 'range',
    'disabled': 'disabled',
    //  'range-key': 'ERROR:',
    'value': 'value'
  },
  event: {
    'change': 'change'
  }
}
