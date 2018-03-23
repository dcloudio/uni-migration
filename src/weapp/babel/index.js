import uniapp from './uniapp'
import quickapp from './quickapp'

import { comment } from '../../utils'

import wx from './wx'

const customApi = [
  'startPullDownRefresh',
  'stopPullDownRefresh',
  'setNavigationBarTitle',
  'setNavigationBarColor',
  'getSystemInfoSync',
  'setStorageSync',
  'getStorageSync',
  'removeStorageSync',
  'clearStorageSync'
]

customApi.forEach(api => {
  wx[api] = {
    type: 'custom',
    module: 'polyfill'
  }
})

const createCallExpressions = {
  uniapp,
  quickapp
}

const createAwaitExpression = (t, callExpression) => t.awaitExpression(callExpression)

const createImportDeclaration = (t, identifier, source) => t.importDeclaration([t.importDefaultSpecifier(t.identifier(identifier))], t.stringLiteral(source))

const processRequire = (t, path, state) => {
  const callExpression = path.parentPath
  if (t.isCallExpression(callExpression) && callExpression.node.arguments && callExpression.node.arguments.length === 1) {
    const arg = callExpression.node.arguments[0]
    if (t.isLiteral(arg)) {
      if (arg.value.indexOf('.') !== 0) {
        arg.value = './' + arg.value
      }
    }
  }
}

const processDefine = (t, path, state) => {
  const callExpression = path.parentPath
  if (t.isCallExpression(callExpression) && callExpression.node.arguments && callExpression.node.arguments.length === 1) {
    const binaryExpression = t.binaryExpression('===', t.unaryExpression('typeof', t.identifier('_$wxs$_'), true), t.stringLiteral('undefined'))
    const conditionalExpression = t.conditionalExpression(binaryExpression, t.objectExpression([]), t.identifier('_$wxs$_'))
    const objectExpression = t.objectExpression([
      t.objectProperty(t.identifier('path'), t.stringLiteral(state.opts.page)),
      t.objectProperty(t.identifier('module'), t.identifier('module')),
      t.objectProperty(t.identifier('exports'), t.identifier('exports')),
      t.objectProperty(t.identifier('$app_require$'), t.identifier('$app_require$')),
      t.objectProperty(t.identifier('wxs'), conditionalExpression)
    ])
    callExpression.node.arguments.push(objectExpression)
  }
}

const addComment = (path, comment) => {
  path.addComment('leading', comment, true)
}

const processWx = (t, path, state) => {
  const memberExpression = path.parentPath
  const callExpression = memberExpression.parentPath
  const property = path.parentPath.node.property
  if (t.isCallExpression(callExpression) && t.isMemberExpression(memberExpression) && t.isIdentifier(property)) {
    const methodDef = wx[property.name]
    if (methodDef) {
      const args = callExpression.node.arguments

      const resultCallExpression = createCallExpressions[state.opts.target || 'uniapp'](t, args, {
        state,
        type: methodDef.type || 'module',
        module: methodDef.module,
        method: methodDef.method,
        wxMethod: property.name
      })

      if (~property.name.indexOf('Sync')) {
        callExpression.replaceWith(createAwaitExpression(t, resultCallExpression))
        let parentPath = callExpression.parentPath
        while (parentPath) {
          if (t.isFunctionExpression(parentPath) || t.isObjectMethod(parentPath)) {
            parentPath.node.async = true
            break
          }
          parentPath = parentPath.parentPath
        }
      } else {
        callExpression.replaceWith(resultCallExpression)
      }
    } else {
      addComment(callExpression.parentPath, comment('unsupported api', 'http://ask.dcloud.net.cn/article/13168'))
    }
  }
}

export default function ({
  types: t
}) {
  return {
    visitor: {
      Program: {
        exit (path, state) {
          if (state.imports) {
            Object.keys(state.imports).forEach(identifier => path.node.body.unshift(createImportDeclaration(t, identifier, state.imports[identifier])))
          }
        }
      },
      Identifier (path, state) {
        switch (path.node.name) {
          case 'wx':
            processWx(t, path, state)
            break
          case 'App':
          case 'Page':
          case 'Component':
            processDefine(t, path, state)
            break
          case 'require':
            processRequire(t, path, state)
            break
        }
      },
      ImportDeclaration (path, state) {
        const value = path.node.source.value
        if (value.indexOf('.') !== 0) {
          path.node.source.value = './' + value
        }
      }
    }
  }
}
