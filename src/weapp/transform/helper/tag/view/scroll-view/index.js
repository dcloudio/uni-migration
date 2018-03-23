export default {
  beforeAttr (node, {
    getAttr,
    addAttr
  }) {
    node.children = [{
      name: 'list-item',
      content: node.content,
      attributes: {
        type: 'u-w-scroll-view-list-item'
      },
      children: node.children
    }]
  },
  name: 'list',
  attr: {},
  event: {
    'scrolltoupper': 'scrolltop',
    'scrolltolower': 'scrollbottom',
    'scroll': 'scroll'
  }
}
