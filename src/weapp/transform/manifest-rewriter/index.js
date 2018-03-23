import path from 'path'
import fs from 'fs-extra'

import {
  error,
  normalizePath
} from '../../../utils'

const processValues = {
  navigationStyle (v, prop) {
    if (prop === 'fullScreen') {
      return v === 'custom'
    } else if (prop === 'titleBar') {
      return v !== 'custom'
    }
  },
  navigationBarTextStyle (v, prop) {
    return v === 'black' ? '#000000' : '#ffffff'
  }
}

const assign = (fromJson, toJson, fromProp, toProp) => {
  if (fromJson.hasOwnProperty(fromProp)) {
    let value = fromJson[fromProp]
    if (processValues[fromProp]) {
      value = processValues[fromProp](value, toProp)
    }
    toJson[toProp] = value
  }
}

// key:to,value:from
const window2display = {
  'backgroundColor': 'backgroundColor',
  'fullScreen': 'navigationStyle',
  'titleBar': 'navigationStyle',
  'titleBarBackgroundColor': 'navigationBarBackgroundColor',
  'titleBarTextColor': 'navigationBarTextStyle',
  'titleBarText': 'navigationBarTitleText'
}

const rewriteWindow = (json, manifest) => {
  if (json.window) {
    Object.keys(window2display).forEach(to => assign(json.window, manifest.display, window2display[to], to))
  }
  return manifest
}

const rewritePageJson = (json, pageJson, manifest, pageInfo, page) => {
  const retJson = {}
  Object.keys(window2display).forEach(to => assign(pageJson, retJson, window2display[to], to))
  manifest.display.pages[pageInfo.path] = retJson
  json['page'][page] = {
    window: pageJson
  }
  return manifest
}

const getPageInfo = page => {
  const pathes = page.split('/')
  pathes.pop()
  return {
    name: 'index', // 固定为index,避免文件名触发保留关键字
    path: pathes.join('/')
  }
}

const rewritePages = (json, manifest, input) => {
  const components = []
  if (json.pages && json.pages.length) {
    manifest.router.entry = getPageInfo(json.pages[0]).path
    const duplicate = {}
    json.pages.forEach(page => {
      const pageInfo = getPageInfo(page)
      if (manifest.router.pages[pageInfo.path]) {
        const exitedPage = manifest.router.pages[pageInfo.path]
        const exitedPagePath = pageInfo.path + '/' + exitedPage.component
        if (!duplicate[exitedPagePath]) {
          duplicate[exitedPagePath] = exitedPage.component
        }
        duplicate[page] = pageInfo.name
      } else {
        manifest.router.pages[pageInfo.path] = {
          component: pageInfo.name
        }
        const pagePath = path.join(input, page + '.json')
        if (fs.existsSync(pagePath)) {
          const pageJson = require(pagePath)
          const usingComponents = pageJson.usingComponents
          if (usingComponents) {
            Object.keys(usingComponents).forEach(key => {
              const componentPath = normalizePath(path.join(path.join(page, '..'), usingComponents[key]))
              if (!~components.indexOf(componentPath)) {
                components.push(componentPath)
              }
            })
          }
          rewritePageJson(json, pageJson, manifest, pageInfo, page)
        }
      }
    })
    Object.keys(duplicate).forEach(page => error('页面目录`' + page + '`重复'))
  }
  return {
    manifest,
    components
  }
}

export default function rewriter (json, input) {
  return rewritePages(json, rewriteWindow(json, require('./manifest.json')), input)
}
