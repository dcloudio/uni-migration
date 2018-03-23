const walk = node => {
  let attrsCode = ''
  let childrenCode = ''
  const attributes = node.attrs
  if (attributes) {
    const attrs = Object.keys(attributes)
    if (attrs.length) {
      attrsCode = ' ' + attrs.map(name => `${name}="${attributes[name]}"`).join(' ')
    }
  }
  if (node.children) {
    childrenCode = node.children.map(childNode => walk(childNode)).join('')
  }
  return `<${node.name || node.type}${attrsCode}>${node.text || ''}${childrenCode}</${node.name || node.type}>`
}

const serialize = nodes => {
  if (!Array.isArray(nodes)) {
    nodes = [nodes]
  }
  return nodes.map(node => walk(node)).join('\r\n')
}

export default function handleRichText (nodes) {
  if (nodes) {
    if (typeof nodes === 'string') {
      if (nodes.indexOf('ESCAPE:') === 0) {
        return unescape(nodes.substr(7))
      }
      return nodes
    } else if (Array.isArray(nodes)) {
      return serialize(nodes)
    }
  }
  return ''
}
