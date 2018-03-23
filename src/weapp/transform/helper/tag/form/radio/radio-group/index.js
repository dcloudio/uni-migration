function setName (node, name, event) {
  const children = node.children
  if (!children.length) {
    return
  }
  for (let i = 0; i < children.length; i++) {
    if (children[i].name === 'radio') {
      children[i].attributes.name = name
      if (event) {
        children[i].attributes.bindinput = event
      }
    } else {
      setName(children[i], name, event)
    }
  }
}

export default {
  name: 'div',
  beforeAttr (node, {
    getAttr,
    addAttr
  }) {
    let event = ''
    if (node.attributes.bindchange) {
      event = node.attributes.bindchange
    }
    let name = 'radio' + new Date().getTime() // 一个group下的radio应该同一个name
    if (node.attributes.dtest && node.attributes.dtest === 'test') {
      name = 'test'
    }
    setName(node, name, event)
  },
  afterAttr (node, {
    getAttr,
    addAttr
  }) {}
}
