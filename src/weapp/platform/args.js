import modules from './modules'
import parseRouter from './router'
import { getCurrentPage } from './App'
import { isFn, isPlainObject } from '../../utils/type'

const createCallback = (callback, processReturnValue, methodName) => ret => callback(processData(ret, processReturnValue, methodName))

const processData = (data, processReturnValue, methodName) => {
  data = processReturnValue(data)
  if (isPlainObject(data) && !data.errMsg) {
    data.errMsg = `${methodName}:ok`
  }
  return data
}

export default function parseArgs (args, options) {
  const methodDef = modules[options.method]
  if (methodDef) {
    if (!isFn(methodDef.returnValue)) {
      methodDef.returnValue = data => data
    }
    if (isFn(args.success)) {
      args.success = createCallback(args.success, methodDef.returnValue, options.method)
    }
    if (isFn(args.complete)) {
      args.complete = createCallback(args.complete, methodDef.returnValue, options.method)
    }

    if (isFn(methodDef.args)) {
      Object.assign(args, methodDef.args(args, options))
      if (isFn(args.callback)) {
        args.callback = createCallback(args.callback, methodDef.returnValue, options.method)
      }
    }
  }
  if (~['navigateTo', 'redirectTo', 'switchTab'].indexOf(options.method) && args.uri) {
    if (options.method === 'switchTab') {
      args.uri = parseRouter(args.uri)
    } else {
      const curPage = getCurrentPage()
      if (curPage && curPage._$path$_) {
        args.uri = parseRouter(args.uri, curPage._$path$_)
      }
    }
  }
  return args
}
