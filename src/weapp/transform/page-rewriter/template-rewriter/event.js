import { isExpr } from '../../../../utils'
const rewriteEventValue = (name, attr, eventName, stopPropagation = false, capture = false) => {
  let value = attr[name].trim()
  if (~value.indexOf('$handleRouterEvent')) {
    return
  }
  if (isExpr(value)) {
    value = value.substr(2, value.length - 4)
    attr[name] = `$handlePageEvent(${value},${stopPropagation},${capture})`
  } else {
    attr[name] = `$handlePageEvent('${value}',${stopPropagation},${capture})`
  }
}
export default function rewriteEvent (name, attr, events, node, output, location) {
  if (!events[name]) {
    output.logs.push({
      reason: 'E: 不支持`' + name + '`事件转换',
      line: location.line,
      column: location.column
    })
    node.$deleteAttrs[name] = attr[name]
  } else {
    let eventName = events[name]
    if (typeof eventName === 'string') {
      if (!eventName) {
        eventName = name
      }
      rewriteEventValue(name, attr, eventName)
      attr['on' + eventName] = attr[name]
    }
  }
  delete attr[name]
}
