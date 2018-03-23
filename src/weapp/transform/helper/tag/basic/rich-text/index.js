import { isExpr } from '../../../../../../utils'
export default {
  name: 'richtext',
  content: true,
  beforeAttr (node, {
    getAttr,
    addAttr,
    addClass
  }) {
    addAttr('type', 'html')
    let nodes = getAttr('nodes')
    if (isExpr(nodes)) {
      nodes = nodes.substr(2, nodes.length - 4)
      node.content = `{{$handleRichText(${nodes})}}`
    } else {
      node.content = `{{$handleRichText('ESCAPE:${escape(nodes)}')}}`
    }
  },
  attr: {
    type: ''
  }
}
