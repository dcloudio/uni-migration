import css from 'css'

import rewriteRule from '../../helper/style'

export default function rewriter (code, options) {
  const logs = []
  const deps = []
  const ast = css.parse(code, {
    silent: true
  })
  // catch syntax error
  if (ast.stylesheet.parsingErrors && ast.stylesheet.parsingErrors.length) {
    ast.stylesheet.parsingErrors.forEach(function (error) {
      logs.push({
        line: error.line,
        column: error.column,
        reason: error.toString().replace('Error', 'ERROR')
      })
    })
  }

  if (ast && ast.type === 'stylesheet' && ast.stylesheet &&
    ast.stylesheet.rules && ast.stylesheet.rules.length) {
    const rules = []
    ast.stylesheet.rules.forEach(function (rule, index) {
      const type = rule.type
      if (type === 'import' && rule.import) {
        rule.import = rule.import.replace('.wxss', options.ext.wxss)
        deps.push(rule.import.replace(/['|"]/g, ''))
        rules.push(rule)
      }
      if (type === 'rule') {
        const newRule = rewriteRule(rule, {
          logs: logs
        })
        if (newRule) {
          rules.push(newRule)
        }
      }
    })
    ast.stylesheet.rules = rules
  }
  return {
    result: ast,
    logs: logs,
    deps: deps
  }
}
