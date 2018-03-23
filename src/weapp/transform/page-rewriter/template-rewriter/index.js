import parseWxml from './wxml'
import rewriteNode from './node'
export default function rewrite (code, pagePath, options, fs) {
  options = Object.assign({}, options)
  parseWxml(code, pagePath, options, fs, true)

  const {
    ret: {
      entry,
      deps
    }
  } = options

  let logs = []
  const depNodes = []
  const entryRet = rewriteNode(entry.nodes, options.usingComponents)
  logs = logs.concat(entryRet.logs)

  Object.keys(deps).forEach(dep => {
    const depRet = rewriteNode(deps[dep].nodes)
    logs = logs.concat(depRet.logs)
    depNodes.push({
      path: dep,
      imports: depRet.imports,
      nodes: depRet.nodes,
      wxs: deps[dep]['wxs']
    })
  })

  return {
    logs: logs,
    imports: entryRet.imports,
    nodes: entryRet.nodes,
    wxs: entry.wxs,
    deps: depNodes
  }
}
