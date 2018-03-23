const simpleSelectorRegex = /^[.#]?[A-Za-z0-9_\-:]+$/
const compoundSelectorRegex = /^([.#]?[A-Za-z0-9_-]+(\s+|\s*>\s*))+([.#]?[A-Za-z0-9_\-:]+)$/
export default function rewriter (selector, rule, output) {
  if (!(simpleSelectorRegex.test(selector) || compoundSelectorRegex.test(selector))) {
    output.logs.push({
      reason: 'W:选择器`' + selector + '`不支持',
      line: rule.position.start.line,
      column: rule.position.start.column
    })
    return false
  }
  if (~selector.indexOf(':before') || ~selector.indexOf(':after') || ~selector.indexOf(':last-child') || ~selector.indexOf(':first-child')) {
    output.logs.push({
      reason: 'W:选择器`' + selector + '`不支持',
      line: rule.position.start.line,
      column: rule.position.start.column
    })
    return false
  }
  if (!(selector.indexOf('.') === 0 || selector.indexOf('#') === 0)) { // 标签样式
    return '.u-w-' + selector
  }
  return selector
}
