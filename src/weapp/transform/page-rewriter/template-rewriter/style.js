import { isExpr, getMatches } from '../../../../utils'
import { processDeclarationValue } from '../../helper/style/util'

export default function rewriteStyle (name, attr, output, location) {
  let value = attr[name]
  if (value) {
    const matches = getMatches(value, /([\w-]+)\s*:\s*([^;]+)/)
    if (matches.length) {
      const ret = []
      matches.forEach(match => {
        if (match.length === 3) {
          if (!isExpr(match[2])) {
            ret.push(match[1] + ':' + processDeclarationValue(match[2]))
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
