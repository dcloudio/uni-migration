import path from 'path'
import rewriteWxs from './cdata'
import parseXml from '../../parser'
import { parseIncludeFile } from './include'
import { resolvePath } from '../../../../../utils'

const walk = (node, codePagePath, ret, options, fs) => {
  const dirname = path.join(codePagePath, '..')
  const name = node.name
  if (name === 'wxs') { // wxs存储并删除
    node.attributes.module && ret.wxs.push({
      name: node.attributes.module,
      src: node.attributes.src,
      content: node.content,
      location: node.location
    })
    return true
  } else if (name === 'import') { // import存储并删除
    node.attributes.src && ret.imports.push({
      name: node.attributes.name || '',
      src: resolvePath(dirname, node.attributes.src, options.input),
      template: !!node.attributes.template,
      location: node.location
    })
    return true
  } else if (name === 'include') {
    if (node.attributes.src) {
      options.location = node.location
      const {
        nodes
      } = parseIncludeFile(resolvePath(dirname, node.attributes.src, options.input), codePagePath, options, fs)
      return nodes
    }
  } else if (name === 'template' && node.attributes.name) { // template name存储并删除
    ret.templates.push({
      name: node.attributes.name,
      nodes: node.children,
      location: node.location
    })
    return true
  }
  let length = node.children.length
  while (length--) {
    const nodes = walk(node.children[length], codePagePath, ret, options, fs)
    if (nodes) {
      if (Array.isArray(nodes)) { // 多重复一个节点检测
        node.children.splice(length, 1, ...nodes)
      } else {
        node.children.splice(length, 1)
      }
    }
  }
}
export default function parseFragment (code, codePagePath, options, fs) {
  const ret = {
    wxs: [],
    views: [], // 视图节点
    imports: [], // import引入
    templates: [] // template定义
  }

  let viewNodes = []

  if (typeof code === 'string') {
    viewNodes = parseXml(`<root>${rewriteWxs(code)}</root>`).children
  } else {
    viewNodes = code
  }
  let length = viewNodes.length
  while (length--) {
    const nodes = walk(viewNodes[length], codePagePath, ret, options, fs)
    if (nodes) {
      if (Array.isArray(nodes)) { // 多重复一个节点检测
        viewNodes.splice(length, 1, ...nodes)
      } else {
        viewNodes.splice(length, 1)
      }
    }
  }

  ret.views = viewNodes

  return ret
}
