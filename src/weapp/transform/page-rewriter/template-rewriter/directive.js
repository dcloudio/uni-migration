import directives from '../../helper/directive'

export default function rewriteDirective (name, attr, node, output, location) {
  // 转换指令
  const directive = directives[name]
  if (!directive) {
    output.logs.push({
      reason: 'E: 不支持`' + name + '`指令转换',
      line: location.line,
      column: location.column
    })
  } else {
    if (typeof directive === 'string') {
      attr[directive] = attr[name]
      delete attr[name]
    } else if (typeof directive === 'function') {
      directive(node)
    }
  }
}
