import rewriteAttr from './attr'
import rewriteEvent from './event'
import rewriteClass from './class'
import rewriteStyle from './style'
import rewriteContent from './content'
import rewriteDirective from './directive'

import tags from '../../helper/tag'
import events from '../../helper/event'

import { isFn } from '../../../../utils'

const regex = /^(bind|catch|capture-bind|capture-catch).*/
const isEvent = name => regex.test(name)

const createAddClass = node => clazz => rewriteClass(clazz, node)

const createGetAttr = node => (key, defaultValue) => {
  if (node.attributes.hasOwnProperty(key)) {
    return node.attributes[key]
  }
  return defaultValue
}

const createAddAttr = node => (key, value) => {
  node.attributes[key] = value
}

const walk = (node, usingComponents, output) => {
  if (node.location) {
    node.location.line = node.location.line + 1
  }
  const location = node.location || {
    line: 1,
    column: 1
  }
  if (node.name === 'img') {
    node.name = 'image'
  }
  if (usingComponents[node.name]) {
    return
  }
  const component = tags[node.name]
  if (!component) {
    output.logs.push({
      reason: 'E: 不支持`' + node.name + '`标签转换',
      line: location.line,
      column: location.column
    })
    node.$delete = true
    return
  }
  if (component.deprecated) {
    output.logs.push({
      reason: 'W: `' + node.name + '`组件已移除,' + component.deprecated,
      line: location.line,
      column: location.column
    })
  }

  node.attributes = node.attributes || {}
  const attributes = node.attributes

  const oldNodeName = node.name

  if (typeof component.name === 'function') {
    node.name = component.name(node)
  } else {
    node.name = component.name
  }
  if (node.name === 'block') { // TODO 临时将block修改为div标签
    node.name = 'div'
  }
  node.$name = oldNodeName
  node.$deleteAttrs = {}

  const extra = {
    getAttr: createGetAttr(node),
    addAttr: createAddAttr(node),
    addClass: createAddClass(node)
  }

  if (isFn(component.beforeAttr)) {
    component.beforeAttr(node, extra)
  }
  // TODO 仅原生组件增加class
  if (node.name !== 'template' && node.name.indexOf('import-') !== 0) {
    if (oldNodeName === 'block') {
      rewriteClass('u-w-view', node)
    } else {
      rewriteClass('u-w-' + oldNodeName, node)
    }
  }

  Object.keys(attributes).forEach(name => {
    if (name === 'style') {
      rewriteStyle(name, attributes, output, location)
    } else if (name === 'hidden') {
      attributes.show = attributes.hidden.replace('{{', '{{!(').replace('}}', ')}}')
      delete attributes['hidden']
    } else if (name.indexOf('wx:') === 0) {
      rewriteDirective(name, attributes, node, output, location)
    } else if (events.hasOwnProperty(name)) { // 全局事件
      rewriteEvent(name, attributes, events, node, output, location)
    } else if (component.event && component.event.hasOwnProperty(name)) { // 当前组件事件
      rewriteEvent(name, attributes, component.event, node, output, location)
    } else if (component.attr && component.attr.hasOwnProperty(name)) {
      rewriteAttr(name, attributes, component, node, output, location)
    } else {
      if (isEvent(name)) {
        node.$deleteAttrs[name] = attributes[name]
      }
      if (!~['id', 'class'].indexOf(name) && name.indexOf('data-') !== 0) {
        delete attributes[name]
      }
    }
  })

  if (isFn(component.afterAttr)) {
    component.afterAttr(node, extra)
  }

  rewriteContent(node, component, extra)

  const children = node.children
  if (children && children.length) {
    children.forEach(childNode => {
      walk(childNode, usingComponents, output)
    })
  }
}

export default function rewriteNode (nodes, usingComponents = {}) {
  const imports = []
  const output = {
    logs: []
  }

  const retNodes = []
  nodes.forEach(node => {
    if (node.name === 'import') {
      imports.push(node)
    } else {
      retNodes.push(node)
    }
  })
  retNodes.forEach(node => walk(node, usingComponents, output))
  return {
    imports: imports,
    nodes: retNodes,
    logs: output.logs
  }
}
