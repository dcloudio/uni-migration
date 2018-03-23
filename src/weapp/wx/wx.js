import modules from '../../../src/weapp/wx/packer'
import { isPlainObject } from '../../../src/utils/type'

const wx = {}

const createCallback = (callback, methodDef, methodName) => {
  return ret => {
    const data = processData(ret, methodDef.returnValue, methodName, true)
    if (isPlainObject(data) && !data.errMsg) {
      data.errMsg = `${methodName}:ok`
    }
    callback(data)
  }
}

const processData = (data, def, methodName, isReturn) => {
  if (typeof def === 'function') {
    data = def(data)
  }
  return data
}

const processAsync = (moduleName, methodName, def) => {
  return {
    enumerable: true,
    configurable: true,
    get: function proxyGetter () {
      const methodDef = def[methodName]
      if (typeof methodDef === 'function') {
        return methodDef
      } else {
        return (args) => {
          args = args || {}
          args = Object.assign(args, processData(args, methodDef.args))

          if (typeof args.success === 'function') {
            args.success = createCallback(args.success, methodDef, methodName)
          }
          if (typeof args.complete === 'function') {
            args.complete = createCallback(args.complete, methodDef, methodName)
          }
          if (typeof args.callback === 'function') {
            args.callback = createCallback(args.callback, methodDef, methodName)
          }
          /*eslint-disable no-undef*/
          return uni[moduleName][methodDef.name](args)
        }
      }
    }
  }
}

const processSync = (moduleName, methodName, def) => {
  return {
    enumerable: true,
    configurable: true,
    get: function proxyGetter () {
      const methodDef = def[methodName]
      return async function (args) {
        args = args || {}
        args = processData(args, methodDef.args)
        /*eslint-disable no-undef*/
        return processData(uni[moduleName][methodDef.name](args), methodDef.returnValue)
      }
    }
  }
}

Object.keys(modules).forEach(moduleName => {
  const moduleDef = modules[moduleName]
  Object.keys(moduleDef).forEach(methodName => {
    if (~methodName.indexOf('Sync')) {
      Object.defineProperty(wx, methodName, processSync(moduleName, methodName, moduleDef))
    } else {
      Object.defineProperty(wx, methodName, processAsync(moduleName, methodName, moduleDef))
    }
  })
})

export default wx
