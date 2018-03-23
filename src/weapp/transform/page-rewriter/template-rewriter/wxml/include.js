import path from 'path'
import rewriteWxs from './cdata'
import parseXml from '../../parser'

import {
  logError
} from '../../../../../utils'

const ignores = ['wxs', 'import', 'template']
const walk = (node, codeIncludePath, options, fs) => {
  if (~ignores.indexOf(node.name)) {
    return true
  }
  if (node.name === 'include' && node.attributes && node.attributes.src) {
    const includePath = path.join(path.join(codeIncludePath, '..'), node.attributes.src)
    options.location = node.location
    const ret = parseIncludeFile(includePath, codeIncludePath, options, fs)
    if (ret.nodes.length) {
      return ret.nodes
    } else {
      return true
    }
  }
  let length = node.children.length
  while (length--) {
    const nodes = walk(node.children[length], codeIncludePath, options, fs)
    if (nodes) {
      if (Array.isArray(nodes)) { // 多重复一个节点检测
        node.children.splice(length, 1, ...nodes)
      } else {
        node.children.splice(length, 1)
      }
    }
  }
}

export function parseIncludeFile (includePath, codePagePath, options, fs) {
  const location = options.location || {
    line: 1,
    column: 1
  }

  if (fs.existsSync(includePath)) {
    return parseInclude(fs.readFileSync(includePath, 'utf-8'), includePath, options, fs)
  } else {
    logError([{
      reason: 'E:`' + includePath + '`不存在',
      line: location.line,
      column: location.column
    }], codePagePath || '')
  }

  return {
    nodes: []
  }
}

export default function parseInclude (code, codeIncludePath, options, fs) {
  let viewNodes = []

  if (typeof code === 'string') {
    viewNodes = parseXml(`<root>${rewriteWxs(code)}</root>`).children
  } else {
    viewNodes = code
  }

  let length = viewNodes.length
  while (length--) {
    const nodes = walk(viewNodes[length], codeIncludePath, options, fs)
    if (nodes) {
      if (Array.isArray(nodes)) { // 多重复一个节点检测
        viewNodes.splice(length, 1, ...nodes)
      } else {
        viewNodes.splice(length, 1)
      }
    }
  }

  return {
    nodes: viewNodes
  }
}
