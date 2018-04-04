const decodeRegexp = /\+/g
const paramRegexp = /([^&=]+)=?([^&]*)/g
const parseParams = function (queryString) {
  const params = {}
  if (queryString) {
    const queryStrings = queryString.split('?')
    if (queryStrings.length === 2) {
      queryString = queryStrings[1]
    }
  }
  if (queryString) {
    let e
    /*eslint-disable no-cond-assign*/
    while (e = paramRegexp.exec(queryString)) {
      params[decode(e[1])] = decode(e[2])
    }
  }
  return params
}
const decode = function (str) {
  return decodeURIComponent(str.replace(decodeRegexp, ' '))
}
const absolute = (base, relative) => {
  if (relative.indexOf('/') === 0) {
    base = ''
    relative = relative.substr(1)
  }
  const stack = base.split('/')
  const parts = relative.split('/')
  stack.pop()
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '.') {
      continue
    }
    if (parts[i] === '..') {
      stack.pop()
    } else {
      stack.push(parts[i])
    }
  }
  stack.pop()
  return stack.join('/')
}
export default function parseRouter (url, base) {
  const parts = url.split('?')
  if (parts.length > 1) {
    return {
      uri: absolute(base || '', parts[0]),
      params: {
        pageQuery: parseParams(parts[1])
      }
    }
  } else {
    return {
      uri: absolute(base || '', parts[0]),
      params: {}
    }
  }
}
