export default function rewriteAttr (name, attr, component, node, output, location) {
  const value = attr[name]

  let formatAttr = component.attr[name]
  if (typeof formatAttr === 'function') {
    formatAttr = formatAttr(value, attr)
  }
  if (formatAttr) {
    if (formatAttr.indexOf('STYLE:') === 0) {
      let styles = []
      if (attr.style) {
        styles = attr.style.split(';')
      }
      let styleAttrs = formatAttr.split('STYLE:')[1]
      if (!styleAttrs) {
        styleAttrs = name
      }
      styleAttrs.split(',').forEach(styleAttr => {
        if (~styleAttr.indexOf(':')) {
          const arr = styleAttr.split(':')
          styles.push(`${arr[0]}:${arr[1]}`)
        } else {
          styles.push(`${styleAttr}:${attr[name]}`)
        }
      })
      attr.style = styles.join(';')
      delete attr[name]
    } else if (formatAttr.indexOf('I:') === 0) {
      const msg = 'I: 组件`' + node.name + '`不支持`' + name + '`属性,自动忽略该配置'
      output.logs.push({
        reason: (formatAttr.length === 2 ? msg : (msg + ',' + formatAttr.replace('I:'))),
        line: location.line,
        column: location.column
      })
      delete attr[name]
    } else if (formatAttr.indexOf('W:') === 0) {
      const msg = 'W: 组件`' + node.name + '`不支持`' + name + '`属性'
      output.logs.push({
        reason: (formatAttr.length === 2 ? msg : (msg + ',' + formatAttr.replace('W:'))),
        line: location.line,
        column: location.column
      })
    } else if (formatAttr.indexOf('E:') === 0) {
      const msg = 'E: 组件`' + node.name + '`不支持`' + name + '`属性配置'
      output.logs.push({
        reason: (formatAttr.length === 2 ? msg : (msg + ',' + formatAttr.replace('E:'))),
        line: location.line,
        column: location.column
      })
      node.$deleteAttrs[name] = value
      delete attr[name]
    } else {
      delete attr[name]
      attr[formatAttr] = value
    }
  }
}
