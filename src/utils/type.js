const _toString = Object.prototype.toString

export const isFn = v => typeof v === 'function'
export const isPlainObject = v => _toString.call(v) === '[object Object]'
