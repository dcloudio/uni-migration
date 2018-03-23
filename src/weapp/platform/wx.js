import { isFn } from '../../utils/type'
export default new Proxy({}, {
  get (target, name) {
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
