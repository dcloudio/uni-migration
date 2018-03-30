import { isExpr, getMatches } from '../../../../utils'
import { processDeclarationValue } from '../../helper/style/util'

import { declarations } from '../../helper/style/declaration'

const processInlineDeclaration = (declaration, output, location) => {
  const ret = []
  if (declaration.property.indexOf('-webkit-') === 0) {
    declaration.property = declaration.property.replace('-webkit-', '')
  }
  declaration.value = processDeclarationValue(declaration.value)

  if (declarations.hasOwnProperty(declaration.property)) {
    let processDeclaration = declarations[declaration.property]
    if (typeof processDeclaration === 'function') {
      processDeclaration = processDeclaration(declaration.value, declaration, function (property, value) {
        ret.push(property + ':' + value)
      }, {
        declarations: []
      })
    }
    if (Array.isArray(processDeclaration)) { // 直接增加一组
      processDeclaration.forEach(declaration => {
        ret.push(declaration.property + ':' + declaration.value)
      })
    } else if (typeof processDeclaration === 'object') { // 直接增加一条
      ret.push(processDeclaration.property + ':' + processDeclaration.value)
    } else if (typeof processDeclaration === 'string') {
      if (processDeclaration.indexOf('I:') === 0) { // 删除
        return ret
      } else if (processDeclaration.indexOf('W:') === 0) { // 警告
        return ret
      } else if (processDeclaration.indexOf('E:') === 0) { // 错误
        const msg = 'E: 内联样式`' + declaration.property + '`不支持`' + declaration.value + '`'
        output.logs.push({
          reason: (processDeclaration.length === 2 ? msg : (msg + ',' + processDeclaration.replace('E:'))),
          line: location.line,
          column: location.column
        })
        return ret
      }
    }
    ret.push(declaration.property + ':' + declaration.value)
  }
  return ret
}

export default function rewriteStyle (name, attr, output, location) {
  let value = attr[name]
  if (value) {
    const matches = getMatches(value, /([\w-]+)\s*:\s*([^;]+)/)
    if (matches.length) {
      let ret = []
      matches.forEach(match => {
        if (match.length === 3) {
          if (!isExpr(match[2])) {
            // 静态内联样式转换
            ret = ret.concat(processInlineDeclaration({
              property: match[1],
              value: match[2]
            }))
          } else {
            ret.push(match[1] + ':' + match[2])
          }
        }
      })
      value = ret.join(';')
    }
  }
  attr[name] = value
}
