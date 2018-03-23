import path from 'path'

export const isWin = /^win/.test(process.platform)

export const isExpr = v => /\{\{(.+?)\}\}/g.test(v)

export const normalizePath = path => path && isWin && path.replace(/\\/g, '/') || path

export const relativePath = (from, to) => {
  const ret = path.relative(from, to)
  return ret.indexOf('.') === 0 ? ret : ('./' + ret)
}

export const resolvePath = (dirname, filePath, base) => {
  if (filePath.indexOf('/') === 0) {
    return path.join(base, filePath)
  }
  return path.join(dirname, filePath)
}

export const comment = (msg, url) => 'uniapp comment: ' + msg + '.' + (url ? '[兼容写法参考](' + url + ')' : '')

export const getMatches = (str, regex) => {
  const matches = []
  let match

  if (regex.global) {
    regex.lastIndex = 0
  } else {
    regex = new RegExp(regex.source, 'g' +
      (regex.ignoreCase ? 'i' : '') +
      (regex.multiline ? 'm' : '') +
      (regex.sticky ? 'y' : ''))
  }
  /*eslint-disable no-cond-assign*/
  while (match = regex.exec(str)) {
    matches.push(match)
    if (regex.lastIndex === match.index) {
      regex.lastIndex++
    }
  }
  return matches
}

export * from './log'

export * from './type'
