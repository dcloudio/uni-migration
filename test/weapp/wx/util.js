const path = require('path')
const chai = require('chai')

const modules = {}
global.polyfill = (dirname, def) => modules[`@app-module/system.${path.basename(dirname)}`] = def
global.$app_require$ = (name) => modules[name] || {}

require('../../../lib/weapp/platform/uniapp/index.js')
require('./wx.js')