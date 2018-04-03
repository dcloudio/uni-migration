import { isFn } from '../../utils/type'
import { fixedModuleName } from './util'
import modules from './modules'
import parseArgs from './args'
export default new Proxy({}, {
  get (target, name) {
    // TODO 待处理 polyfill 中的模块方法
    const methodDef = modules[name]
    if (methodDef) {
      return function (args) {
        /*eslint-disable camelcase,no-undef*/
        return $app_require$(fixedModuleName(methodDef['module']))[methodDef.name](parseArgs(args, {
          method: name
        }))
      }
    }
    return function ({
      fail,
      complete
    } = {}) {
      const ret = {
        errMsg: name + ':fail'
      }
      isFn(fail) && fail(ret)
      isFn(complete) && complete(ret)
      console.error(`暂不支持wx.${name}调用`)
    }
  }
})
