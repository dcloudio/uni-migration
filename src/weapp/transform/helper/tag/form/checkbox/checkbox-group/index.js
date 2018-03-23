function setName (node, name) {
  const children = node.children
  if (!children.length) {
    return
  }
  for (let i = 0; i < children.length; i++) {
    if (children[i].name === 'checkbox') {
      children[i].attributes.name = name
    } else {
      setName(children[i], name)
    }
  }
}

export default {
  name: 'div',
  beforeAttr (node, {
    getAttr,
    addAttr
  }) {
    let name = 'checkbox' + new Date().getTime() // 一个group下的checkbox应该同一个name
    if (node.attributes.dtest && node.attributes.dtest === 'test') {
      name = 'test'
    }
    setName(node, name)
  },
  afterAttr (node, {
    getAttr,
    addAttr
  }) {
  }
}
