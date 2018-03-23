import {
  comment
} from '../../../../utils'
/**
 * 在rule中删除指定property的declaration
 */
export const removeDeclaration = (property, rule) => rule.declarations.splice(rule.declarations.findIndex(v => v.property === property), 1)
/**
 * 在rule中增加一条declaration
 */
export const addDeclaration = (property, value, rule) => rule.declarations.push({
  type: 'declaration',
  property,
  value
})
/**
 * 在rule中增加一条comment
 */
export const addComment = (property, value, rule) => rule.declarations.push({
  type: 'comment',
  comment: `${property}:${value}; ${comment('unsupported style', 'http://ask.dcloud.net.cn/article/13170')}`
})

export const getDeclarationValue = (property, rule) => {
  const declarations = rule.declarations.filter(declaration => declaration.property === property)
  return declarations.length && declarations[0] || false
}

const defaultFontSize = 32

const processDeclarationValueUnit = v => {
  if (~v.indexOf('rpx')) {
    return v.replace('rpx', 'px')
  } else if (~v.indexOf('px')) {
    const numberV = parseFloat(v)
    if (!isNaN(numberV)) {
      return numberV * 2 + 'px'
    }
  } else if (~v.indexOf('em')) {
    const numberV = parseFloat(v)
    if (!isNaN(numberV)) {
      return numberV * defaultFontSize + 'px'
    }
  }
  return v
}

export const processDeclarationValue = value => {
  if (typeof value === 'string') {
    return value.split(/\s+/).map(v => processDeclarationValueUnit(v)).join(' ')
  }
  return value
}
