import { isFn } from '../../utils/type'

const currentPages = []

export const getCurrentPage = function () {
  return currentPages.length && currentPages[currentPages.length - 1]
}

export const getCurrentPages = function () {
  return currentPages
}

export const setCurrentPage = function (page) {
  const index = currentPages.indexOf(this)
  if (~index) { // 已存在则删除
    currentPages.splice(index, 1)
  }
  currentPages.push(page)
}

export const removeCurrentPage = function () {
  currentPages.pop()
}

const initGetApp = (app, extraData) => {
  Object.keys(extraData).forEach(prop => {
    app[prop] = extraData[prop]
  })
  return () => app
}

export default function App (options, {
  module,
  exports,
  /*eslint-disable camelcase*/
  $app_require$
}) {
  // 将非function,非data的数据移动到data中
  const dataProps = []
  Object.keys(options).forEach(prop => {
    if (prop !== 'data' && prop !== 'manifest' && !isFn(options[prop])) {
      dataProps.push(prop)
    }
  })
  const extraData = {}
  dataProps.forEach(prop => {
    extraData[prop] = options[prop]
    delete options[prop]
  })
  options.onCreate = function () {
    (Object.getPrototypeOf(global) || global).getApp = initGetApp(this, extraData)

    const args = {
      path: '',
      scene: 1001,
      query: {}
    }
    isFn(this.onLaunch) && this.onLaunch(args)
    isFn(this.onShow) && this.onShow(args)

    /*eslint-disable camelcase,no-undef*/
    typeof dc_stat !== 'undefined' && (dc_stat.report())
  }

  options.getCurrentPages = getCurrentPages

  if (exports.default) {
    exports.default = options
  } else if (module.exports) {
    module.exports = options
  }
}
