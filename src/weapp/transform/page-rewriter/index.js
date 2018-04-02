import path from 'path'
import fs from 'fs-extra'
import css from 'css'
import { pd as beautify } from 'pretty-data'

import {
  logError,
  relativePath,
  normalizePath
} from '../../../utils'

import serialize from './serialize'

import rewriteTabs from './tabs'
import rewriteRoot from './root'
import rewriteRefresh from './refresh'
import rewriteScript from './script-rewriter'
import rewriteStyle from './style-rewriter'
import rewriteTemplate from './template-rewriter'

import generateImportCode from './import'

export const parseImportWxss = (wxssPath, nssPath, options) => {
  if (fs.existsSync(wxssPath) && !fs.existsSync(nssPath)) {
    const styleRet = rewriteStyle(fs.readFileSync(wxssPath, 'utf-8'), options)
    if (logError(styleRet.logs, wxssPath)) {
      return false
    }
    styleRet.deps.forEach(dep => {
      parseImportWxss(path.join(path.join(wxssPath, '..'), dep.replace(options.ext.wxss, '.wxss')), path.join(path.join(nssPath, '..'), dep), options)
    })
    if (styleRet.result) {
      try {
        const styleCode = css.stringify(styleRet.result)
        fs.outputFileSync(nssPath, styleCode, {
          override: true
        })
      } catch (e) {
        logError([{
          reason: 'E:wxss转换失败',
          line: 1,
          column: 1
        }], wxssPath)
      }
    }
  }
}

export const parseWxs = (wxs, pagePath, options) => {
  if (wxs.src) {
    return {
      name: wxs.name,
      code: `import _$wxs_${wxs.name}$_ from '${wxs.src.replace('.wxs', options.ext.wxs)}';`
    }
  } else {
    const wxsPath = normalizePath(relativePath(pagePath, wxs.path).replace('.wxs', options.ext.wxs))
    return {
      name: wxs.name,
      code: `import _$wxs_${wxs.name}$_ from '${wxsPath}';`
    }
  }
}

export default function rewriter (pagePath, importAppWxssCode, relativePath, options) {
  let wxsCode = ''
  let styleCode = ''
  let scriptCode = ''
  let templateCode = ''
  let wxsDeps = []
  let styleDeps = []
  let templateDeps = []
  let templateImports = []

  if (fs.existsSync(pagePath + '.wxss')) {
    const styleRet = rewriteStyle(fs.readFileSync(pagePath + '.wxss', 'utf-8'), options)
    if (logError(styleRet.logs, pagePath + '.wxss')) {
      return false
    }
    styleDeps = styleRet.deps
    if (styleRet.result) {
      try {
        styleCode = css.stringify(styleRet.result)
      } catch (e) {
        logError([{
          reason: 'E:wxss转换失败',
          line: 1,
          column: 1
        }], pagePath + '.wxss')
      }
    }
  }
  if (fs.existsSync(pagePath + '.js')) {
    const scriptRet = rewriteScript(fs.readFileSync(pagePath + '.js', 'utf-8'), relativePath, options)
    if (logError(scriptRet.logs, pagePath + '.js')) {
      return false
    }
    if (scriptRet.result) {
      scriptCode = scriptRet.result
    } else {
      logError([{
        reason: 'E:js转换失败',
        line: 1,
        column: 1
      }], pagePath + '.js')
      return false
    }
  }
  if (fs.existsSync(pagePath + '.wxml')) {
    const templateRet = rewriteTemplate(fs.readFileSync(pagePath + '.wxml', 'utf-8'), pagePath + '.wxml', options, fs)
    if (logError(templateRet.logs, pagePath + '.wxml')) {
      return false
    }
    wxsDeps = templateRet.wxs
    templateDeps = templateRet.deps
    templateImports = templateRet.imports
    if (templateRet.nodes) {
      templateCode = serialize(templateRet.nodes)
      if (options.hasOwnProperty('tabBarIndex')) { // 注入tabbar
        templateCode = rewriteTabs(templateCode, options.tabBarOptions, options.tabBarIndex)
      }
      if (options.hasOwnProperty('refresh')) { // 注入refresh
        templateCode = rewriteRefresh(templateCode)
      }
      templateCode = beautify.xml(rewriteRoot(templateCode))
    } else {
      logError([{
        reason: 'E:模板转换失败',
        line: 1,
        column: 1
      }], pagePath + '.wxml')
      return false
    }
  }
  const wxsRet = wxsDeps.map(wxs => parseWxs(wxs, path.join(pagePath, '..'), options))
  wxsCode = `${wxsRet.map(wxs => wxs.code).join('\r\n')}
const _$wxs$_ = {
${wxsRet.map(wxs => wxs.name + ': _$wxs_' + wxs.name + '$_').join(',\r\n')}
}
`

  templateImports = templateImports.concat(
    Object.keys(options.usingComponents).map(name => {
      const paths = options.usingComponents[name].split('/')
      paths.pop()
      return {
        name: 'import',
        attributes: {
          name: name,
          src: paths.join('/') + '/index.wxml'
        }
      }
    }))
  const importTemplateCode = generateImportCode(templateImports, options)
  return {
    code: `${importTemplateCode}
<template>
${templateCode}
</template>
<style>
${importAppWxssCode}
${styleCode}
</style>
<script>
${wxsCode}
${scriptCode}
</script>
  `,
    deps: {
      wxs: wxsDeps.filter(dep => !dep.src),
      style: styleDeps,
      template: templateDeps,
      styleCode: styleCode
    }
  }
}
