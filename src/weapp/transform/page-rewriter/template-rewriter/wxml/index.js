import path from 'path'

import parseFragment from './fragment'

import { relativePath, normalizePath, logError } from '../../../../../utils'

const processWxs = (wxs, pagePath, options) => {
  return wxs.map(({
    name,
    src,
    path,
    content
  }) => {
    return {
      name,
      src,
      content,
      path: pagePath.replace('.wxml', '-wxs-' + name + options.ext.wxs)
    }
  })
}

const processTemplates = (templates, importDeps, views, pagePath, options, fs) => {
  const length = templates.length
  return templates.map(({
    name,
    nodes,
    location
  }) => {
    if (length > 1 || views.length) {
      pagePath = pagePath.replace('.wxml', '-' + name + '.wxml')
    }

    // <template name="a"/>检测注入import
    importDeps.forEach(({
      name,
      src
    }) => addImport(name, normalizePath(relativePath(path.join(pagePath, '..'), src)), nodes))

    options.location = location
    const ret = parse(nodes, pagePath, options, fs)
    ret.deps = [{
      name: name,
      src: pagePath
    }]
    return ret
  })
}

const processImports = (imports, pagePath, options, fs) => {
  return imports.map(({
    src,
    location
  }) => {
    options.location = location
    return parseFile(src, pagePath, options, fs, false)
  })
}

const hasTemplate = (name, views) => {
  let has = false
  views.every(v => {
    if (v.name === 'template' && v.attributes && v.attributes.is === name) {
      has = true
      return false
    }
    has = hasTemplate(name, v.children)
    return !has
  })
  return has
}

const addImport = (name, src, views) => {
  if (hasTemplate(name, views)) {
    views.unshift({
      name: 'import',
      attributes: {
        name: 'import-' + name.toLowerCase(),
        src: src
      },
      children: []
    })
  }
}

const parseFragments = ({
  wxs, // wxs
  views, // 视图节点
  imports, // import引入
  templates // template定义
}, codePagePath, options, fs, isEntry) => {
  let deps = []
  let wxsDeps = []
  // 第一步,解析imports
  let importDeps = []
  processImports(imports, codePagePath, options, fs).forEach(ret => {
    importDeps = importDeps.concat(ret.deps)
    if (views.length) {
      ret.deps.forEach(({
        name,
        src
      }) => addImport(name, normalizePath(relativePath(path.join(codePagePath, '..'), src)), views))
    }
  })
  // 第二步:生成Template=>Component
  processTemplates(templates, importDeps, views, codePagePath, options, fs).forEach(ret => {
    deps = deps.concat(ret.deps)
    // TODO template定义wxml是否支持wxs?
  })
  // 第三步:生成wxs
  wxsDeps = processWxs(wxs, codePagePath, options)
  // 第四步:生成Views
  if (views.length) {
    if (isEntry) {
      options.ret['entry'] = {
        nodes: views,
        wxs: wxsDeps
      }
    } else {
      const outPagePath = path.join(options.output,
        relativePath(options.input, codePagePath))
        .replace('.wxml', options.ext.wxml)
      options.ret['deps'][outPagePath] = {
        nodes: views,
        wxs: wxsDeps
      }
    }
  }
  return {
    deps: deps,
    wxs: wxsDeps
  }
}

export function parseFile (filePath, pagePath, options, fs, isEntry) {
  const location = options.location || {
    line: 1,
    column: 1
  }
  // 目标文件存在,且未转换
  if (fs.existsSync(filePath)) {
    return parse(fs.readFileSync(filePath, 'utf-8'), filePath, options, fs, isEntry)
  } else {
    logError([{
      reason: 'E:`' + filePath + '`不存在',
      line: location.line,
      column: location.column
    }], pagePath || '')
  }
  return {
    deps: []
  }
}

export default function parse (code, codePagePath, options, fs, isEntry) {
  if (!options.ret) {
    options.ret = {
      entry: {},
      deps: {}
    }
  }
  // 是否是入口页面
  isEntry = typeof isEntry === 'undefined' ? false : !!isEntry
  return parseFragments(parseFragment(code, codePagePath, options, fs), codePagePath, options, fs, isEntry)
}
