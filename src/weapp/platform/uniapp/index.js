import '../regenerator'
import App from '../App'
import Page from '../Page'
import Component from '../Component'

import parseArgs from '../args'

import * as polyfill from '../polyfill/index'

import wx from '../wx'

const serviceModules = ['push', 'pay', 'wxpay', 'alipay', 'appshare']

const fixedModuleName = function (module) {
  if (~serviceModules.indexOf(module)) {
    return '@app-module/service.' + module
  }
  return '@app-module/system.' + module
}

const uni = Object.assign({}, polyfill)

uni.parseArgs = parseArgs

const _$global$_ = Object.getPrototypeOf(global) || global

_$global$_.wx = wx

_$global$_.App = App
_$global$_.Page = Page
_$global$_.Component = Component

_$global$_.uni = new Proxy(uni, {
  get (target, name) {
    if (uni[name]) {
      return uni[name]
    }
    /*eslint-disable camelcase,no-undef*/
    return $app_require$(fixedModuleName(name))
  }
})
