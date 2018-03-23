import {
  comment
} from '../../../utils'

const names = ['checked', 'disabled']

const createAttrsCode = attrs => {
  let attrsCode = ''
  const attrKeys = Object.keys(attrs)
  if (attrKeys.length) {
    attrsCode = ' ' + attrKeys.map(name => {
      if (!attrs[name] && ~names.indexOf(name)) {
        return `${name}="true"`
      }
      return name === 'else' ? `${name}` : `${name}="${attrs[name]}"`
    }).join(' ')
  }
  return attrsCode
}

const createNodeCode = (witchComment, name, children, content, attrsCode) => `<${name}${attrsCode}>${content || ''}${children.map(childNode => walk(childNode, witchComment)).join('')}</${name}>`

const createDeleteNodeCode = (name, attrsCode) => '<' + name + '>' + attrsCode

const walk = (node, witchComment) => {
  const attrsCode = createAttrsCode(node.attributes)

  const nodeCode = createNodeCode(witchComment, node.name, node.children, node.content, attrsCode)

  if (witchComment && node.$delete) { // 不支持的节点,整个注释
    return `<!--${comment('unsupported component', 'http://ask.dcloud.net.cn/article/13169')}
${nodeCode}-->`
  }

  const deleteAttrsCode = createAttrsCode(node.$deleteAttrs || {})

  if (witchComment && deleteAttrsCode) {
    const deleteNodeCode = createDeleteNodeCode(node.$name, deleteAttrsCode)
    return `<!--${deleteNodeCode} ${comment('unsupported property', 'http://ask.dcloud.net.cn/article/13169')}-->${nodeCode}`
  }

  return nodeCode
}

export default function serialize (nodes, witchComment = true) {
  if (!Array.isArray(nodes)) {
    nodes = [nodes]
  }
  return nodes.map(node => walk(node, witchComment)).join('\r\n')
}
