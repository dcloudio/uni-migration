import css from 'css'

import rewriteSelector from './selector'
import rewriteDeclaration from './declaration'

import {
  addComment,
  addDeclaration,
  removeDeclaration
} from './util'

import {
  comment
} from '../../../../utils'

export default function rewriter (rule, output) {
  output.declaration = {
    deleted: [],
    inserted: []
  }
  const selectors = rule.selectors.map(selector => rewriteSelector(selector, rule, output)).filter(v => !!v)

  if (!selectors.length) {
    return {
      type: 'comment',
      comment: `
${comment('unsupported selector', 'http://ask.dcloud.net.cn/article/13170')}
${css.stringify({ stylesheet: { rules: [rule] }})}
`
    }
  }
  rule.selectors = selectors
  rule.declarations.forEach(declaration => declaration.type === 'declaration' && rewriteDeclaration(declaration, rule, output))
  // delete
  output.declaration.deleted.forEach(declaration => removeDeclaration(declaration.property, rule))
  // insert declaration
  output.declaration.inserted.forEach(declaration => addDeclaration(declaration.property, declaration.value, rule))
  // insert comment(by delete)
  output.declaration.deleted.forEach(declaration => addComment(declaration.property, declaration.value, rule))
  return rule
}
