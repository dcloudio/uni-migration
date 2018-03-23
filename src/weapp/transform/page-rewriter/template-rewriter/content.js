export default function rewriteContent (node, component, {
  addAttr
}) {
  if (node.content) {
    if (!component.content) { // 不支持content节点
      node.children.push({
        name: 'text',
        content: node.content,
        attributes: {},
        children: []
      })
      delete node.content
    } else if (typeof component.content === 'string') {
      addAttr(component.content, node.content)
      delete node.content
    }
  }
}
