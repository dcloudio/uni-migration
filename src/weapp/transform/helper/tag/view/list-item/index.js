export default {
  beforeAttr (node, {
    getAttr,
    addAttr
  }) {
    if (!getAttr('type')) {
      addAttr('type', 'u-w-list-item')
    }
  },
  name: 'list-item',
  attr: {
    'type': ''
  }
}
