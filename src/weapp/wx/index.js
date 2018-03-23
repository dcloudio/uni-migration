import target from './wx';

(Object.getPrototypeOf(global) || global).wx = new Proxy(target, {
  get (target, methodName) {
    if (methodName in target) {
      return target[methodName]
    }
    console.error(`暂不支持"${methodName}"`)
    return () => {}
  }
})
