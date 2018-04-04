import events from '../transform/helper/event/packer'
import { isFn } from '../../utils/type'

import createHandleRouterEvent from './navigator'

import { setCurrentPage, removeCurrentPage } from './App'

const handlePageRefresh = function (evt) {
  this.pageIsRefreshing = evt.refreshing
  evt.refreshing && isFn(this.onPullDownRefresh) && this.onPullDownRefresh()
}

const datasetRegex = /data([A-Z$](?:[A-Za-z_$]*))/
export const handlePageEvent = function (method, stopPropagation, capture, evt) {
  let detail = {}
  if (evt.target && evt.target.type) {
    const evtDef = events[evt.target.type]
    if (evtDef && evtDef[evt.type] && isFn(evtDef[evt.type].detail)) {
      detail = evtDef[evt.type].detail(evt) || {}
    }
  }
  // dataset
  evt.target.dataset = {}
  if (evt.target.attr) {
    Object.keys(evt.target.attr).forEach(name => {
      const matches = name.match(datasetRegex)
      if (matches && matches.length === 2) {
        let datasetName = matches[1]
        datasetName = datasetName.substr(0, 1).toLowerCase() + datasetName.substr(1, datasetName.length)
        evt.target.dataset[datasetName] = evt.target.attr[name]
      }
    })
  }
  evt.currentTarget = evt.target
  evt.detail = detail
  this[method](evt)
}

const initMixin = (options, path, /*eslint-disable camelcase*/ $app_require$) => {
  initHelper(options, path, /*eslint-disable camelcase*/ $app_require$)
}

const initHelper = (options, path, /*eslint-disable camelcase*/ $app_require$) => {
  options.$handlePageEvent = handlePageEvent // 处理普通页面事件
  options.$handlePageRefresh = handlePageRefresh // 处理页面下拉刷新
  options.$handleRouterEvent = createHandleRouterEvent($app_require$, path) // 处理路由跳转
}

const builtin = ['methods', 'properties', 'data', 'behaviors', 'relations', 'externalClasses', 'created', 'attached', 'ready', 'moved', 'detached']
export default function Base (options, {
  wxs,
  type,
  path,
  module,
  exports,
  $app_require$
}) {
  initMixin(options, path, $app_require$)
  if (type === 'Template') {
    return
  }

  options.update = function () {
    // TODO
  }

  options.setData = function (data) {
    if (data) {
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'undefined') {
          this.data[key] = undefined
        } else {
          try {
            this.data[key] = JSON.parse(JSON.stringify(data[key]))
          } catch (e) {
            console.error(e)
            this.data[key] = data[key]
          }
        }
        this.$set(key === 'data' ? 'proxyDataKey' : key, data[key])
      })
    }
  }

  const onLoad = options.onLoad
  options.onInit = function () {
    this._$path$_ = path
    // 初始化wxs
    Object.keys(wxs).forEach(prop => {
      this[prop] = wxs[prop]
    })
    // 初始化下拉刷新状态
    this.$set('pageIsRefreshing', false)
    // 初始化页面数据
    const data = this.$getPageInitData()
    try {
      this.data = JSON.parse(JSON.stringify(data)) // data副本
    } catch (e) {
      console.error(e)
      this.data = Object.assign({}, data)
    }
    Object.keys(data).forEach(key => {
      this.$set(key === 'data' ? 'proxyDataKey' : key, data[key])
    })
    let pageQuery = {}
    if (this.pageQuery) {
      try {
        pageQuery = JSON.parse(this.pageQuery)
      } catch (e) {
        console.error(e)
      }
    }
    isFn(onLoad) && onLoad.call(this, pageQuery)
  }

  const onShow = options.onShow
  options.onShow = function () {
    type === 'Page' && setCurrentPage(this)

    isFn(onShow) && onShow.call(this)
  }

  options.onDestroy = function () {
    type === 'Page' && removeCurrentPage()

    isFn(options.onUnload) && options.onUnload.call(this)
  }

  // 将非function,非data的数据移动到data中
  const moveToData = []

  Object.keys(options).forEach(prop => {
    if (!~builtin.indexOf(prop) && !isFn(options[prop])) {
      moveToData.push(prop)
    }
  })

  if (moveToData.length) {
    if (!options.data) {
      options.data = {}
    }
    moveToData.forEach(prop => {
      options.data[prop] = options[prop]
      delete options[prop]
    })
  }

  const initData = options.data || {}
  delete options.data
  options.$getPageInitData = function () {
    return initData
  }
}
