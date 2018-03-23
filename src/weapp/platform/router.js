const absolute = (base, relative) => {
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
    return absolute(base || '', parts[0]) + '?' + parts[1]
  } else {
    return absolute(base || '', parts[0])
  }
}
