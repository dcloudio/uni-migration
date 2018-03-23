import Base from './Base'
import Behavior from './Behavior'
import { isFn } from '../../utils/type'

const invokeHook = function (name) {
  if (Array.isArray(this[name])) {
    this[name].forEach(method => method.call(this))
  }
}

export default function Component (options, {
  wxs,
  path,
  module,
  exports,
  /*eslint-disable camelcase*/
  $app_require$
}) {
  options = Behavior(options)

  Base(options, {
    wxs,
    type: 'Component',
    path,
    module,
    exports,
    $app_require$
  })

  options.props = []
  if (options.properties) {
    Object.keys(options.properties).forEach(name => options.props.push(name))
    delete options.properties
  }

  if (options.methods) {
    Object.keys(options.methods).forEach(method => {
      options[method] = options.methods[method]
    })
    delete options.methods
  }

  const onReady = options.onReady
  options.onReady = function () {
    isFn(onReady) && onReady.call(this)
    invokeHook.call(this, 'created')
    invokeHook.call(this, 'attached')
    invokeHook.call(this, 'ready')
  }

  const onDestroy = options.onDestroy
  options.onDestroy = function () {
    isFn(onDestroy) && onDestroy.call(this)
    invokeHook.call(this, 'detached')
  }

  options.hasBehavior = function (behavior) {
    // TODO
  }

  options.triggerEvent = function (type, detail, {
    bubbles = false,
    composed = false,
    capturePhase = false
  } = {}) {
    this.$dispatch(type, detail)
  }

  if (exports.default) {
    exports.default = options
  } else if (module.exports) {
    module.exports = options
  }
}
