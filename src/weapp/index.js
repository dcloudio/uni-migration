import path from 'path'
import fs from 'fs-extra'

import {
  info,
  error,
  relativePath,
  normalizePath
} from '../utils'

import config from './config'

import transform from './transform'
import { parseImportWxss } from './transform/page-rewriter'
import rewriteImport from './transform/page-rewriter/import-rewriter'

const processTabBarOptions = tabBarOptions => {
  if (tabBarOptions) {
    tabBarOptions.position = tabBarOptions.position || 'bottom'
    tabBarOptions.borderStyle = tabBarOptions.borderStyle || 'black'
    tabBarOptions.color = tabBarOptions.color || '#3D3D3D'
    tabBarOptions.selectedColor = tabBarOptions.selectedColor || '#70B840'
    tabBarOptions.backgroundColor = tabBarOptions.backgroundColor || '#FAFAFA'
  }
  return tabBarOptions
}

const getTabBarIndex = (pagePath, list) => list.findIndex(page => page.pagePath === pagePath)

const isEnablePullDownRefresh = (pagePath, appJson) => {
  const pageJsonEnablePullDownRefresh = appJson.page &&
    appJson.page[pagePath] &&
    appJson.page[pagePath].window &&
    appJson.page[pagePath].window.enablePullDownRefresh
  if (typeof pageJsonEnablePullDownRefresh === 'boolean') {
    return pageJsonEnablePullDownRefresh
  }
  return appJson.window && appJson.window.enablePullDownRefresh
}

const getUsingComponents = (pagePath, appJson) => {
  const usingComponents = appJson.page &&
    appJson.page[pagePath] &&
    appJson.page[pagePath].window &&
    appJson.page[pagePath].window.usingComponents
  if (typeof usingComponents === 'object') {
    return usingComponents
  }
  return {}
}

export default {
  config,
  validate (input, logs) {
    const appJs = path.join(input, 'app.js')
    const appJson = path.join(input, 'app.json')
    let ret = true
    if (!fs.existsSync(appJs)) {
      ret = false
      error('缺少文件`' + appJs + '`')
    }
    if (!fs.existsSync(appJson)) {
      ret = false
      error('缺少文件`' + appJson + '`')
    }
    return ret
  },
  transform (input, out, options) {
    // 第一步:清空out TODO 暂不清理目标目录
    //  fs.emptyDirSync(path.join(out))
    // 第二步:根据app.json生成manifest.json
    const appJson = require(path.join(input, 'app.json'))
    appJson['page'] = {}
    const tabBarOptions = processTabBarOptions(appJson.tabBar)
    const manifestRet = transform.manifest(appJson, input)
    const manifestJson = manifestRet.manifest
    const components = manifestRet.components
    if (!manifestJson) {
      return
    }
    fs.outputFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifestJson), {
      override: true
    })
    // 第三步:根据app.js生成app.njs
    // 拷贝polyfill.js
    fs.copySync(path.join(__dirname, './platform/' + options.target + '/index.js'), path.join(out, 'polyfill.js'))
    const appCode = transform.app(fs.readFileSync(path.join(input, 'app.js'), 'utf-8'), 'app', options)
    if (!appCode) {
      return
    }
    fs.outputFileSync(path.join(out, 'app' + options.ext.app), appCode, {
      override: true
    })
    // 第四步:生成app.css,polyfill.css
    // 生成polyfill.css
    fs.copySync(path.join(__dirname, './transform/helper/style/uniapp.css'), path.join(out, 'polyfill' + options.ext.wxss))
    // 生成app.css
    const appWxssPath = path.join(input, 'app.wxss')
    const hasAppWxss = fs.existsSync(appWxssPath)
    if (hasAppWxss) { // 生成app.css
      parseImportWxss(appWxssPath, path.join(out, 'app' + options.ext.wxss), options)
    }
    // 第五步:根据app.json路由生成pages
    const ignoreFiles = ['app.js', 'app.json']
    appJson.pages.concat(components).every(routerPageFile => {
      const filePaths = routerPageFile.split('/')
      filePaths.pop()
      const filePath = filePaths.join('/')
      ignoreFiles.push(routerPageFile + '.js')
      ignoreFiles.push(routerPageFile + '.json')
      const pagePath = path.join(input, routerPageFile)
      const pageRelativePath = relativePath(path.join(input, filePath), appWxssPath)
      const importNssPath = normalizePath(pageRelativePath).replace('app.wxss', 'app' + options.ext.wxss)
      const importPolyfillCssPath = normalizePath(pageRelativePath).replace('app.wxss', 'polyfill' + options.ext.wxss)
      let importNssCode = `@import '${importPolyfillCssPath}';\r\n`
      if (hasAppWxss) {
        importNssCode += `@import '${importNssPath}';\r\n`
      }
      if (tabBarOptions) {
        const tabBarIndex = getTabBarIndex(routerPageFile, tabBarOptions.list)
        if (tabBarIndex !== -1) {
          options.tabBarIndex = tabBarIndex
          options.tabBarOptions = tabBarOptions
        } else {
          delete options.tabBarIndex
          delete options.tabBarOptions
        }
      }
      if (isEnablePullDownRefresh(routerPageFile, appJson)) {
        options.refresh = true
      } else {
        delete options.refresh
      }
      options.usingComponents = getUsingComponents(routerPageFile, appJson)
      const pageRet = transform.page(pagePath, importNssCode, routerPageFile, options)
      if (pageRet.code) {
        const outRouterPageFile = filePath + '/index'
        const outPagePath = path.join(out, outRouterPageFile + options.ext.wxml)
        // wxs deps
        pageRet.deps.wxs.forEach(dep => {
          fs.outputFileSync(dep.path, dep.content, {
            override: true
          })
          info(dep.path.replace(options.ext.wxs, '.wxs') + ' 转换完毕!')
        })
        // style deps
        pageRet.deps.style.forEach(dep => {
          parseImportWxss(path.join(input, filePath, dep.replace(options.ext.wxss, '.wxss')), path.join(out, filePath, dep), options)
        })
        // template deps
        pageRet.deps.template.forEach(dep => {
          const depCode = rewriteImport(dep.path, dep.nodes, options)
          if (depCode) {
            fs.outputFileSync(dep.path, depCode, {
              override: true
            })
            info(dep.path + ' 转换完毕!')
          }
        })
        fs.outputFileSync(outPagePath, pageRet.code, {
          override: true
        })
        info(outRouterPageFile + options.ext.wxml + ' 转换完毕!')
        return true
      }
      return false
    })
    // 第六步:拷贝项目资源
    transform.resource(input, out, ignoreFiles, '.', options)
  }
}
