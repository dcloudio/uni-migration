export default {
  beforeAttr (node, {
    getAttr,
    addAttr
  }) {
    for (let i = 0, len = node.children.length; i < len; i++) {
      node.children[i] = {
        name: 'list-item',
        content: node.content,
        attributes: {
          type: 'u-w-scroll-view-list-item-' + i
        },
        children: [node.children[i]]
      }
    }
  },
  name: 'list',
  attr: {},
  event: {
    'scrolltoupper': 'scrolltop',
    'scrolltolower': 'scrollbottom',
    'scroll': 'scroll'
  }
}
