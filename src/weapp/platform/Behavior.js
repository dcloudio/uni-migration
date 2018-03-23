import { isPlainObject } from '../../utils/type'

const ASSET_TYPES = ['properties', 'data', 'methods', 'relations']

const LIFECYCLE_HOOKS = ['created', 'attached', 'ready', 'moved', 'detached']

const mergeData = (to, from) => {
  if (!from) return to
  Object.keys(from).forEach(key => {
    const toVal = to[key]
    const fromVal = from[key]
    if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal)
    } else {
      to[key] = fromVal
    }
  })
  return to
}

const mergeHook = (parentVal, childVal) => childVal ? (parentVal ? parentVal.concat(childVal) : (Array.isArray(childVal) ? childVal : [childVal])) : parentVal

const mergeBehavior = (parent, child) => {
  const behavior = {}

  const mergeProp = prop => {
    if (~LIFECYCLE_HOOKS.indexOf(prop)) {
      behavior[prop] = mergeHook(parent[prop], child[prop])
    } else if (~ASSET_TYPES.indexOf(prop)) {
      behavior[prop] = mergeData(parent[prop] || {}, child[prop])
    } else {
      behavior[prop] = child[prop] === undefined ? parent[prop] : child[prop]
    }
  }

  Object.keys(parent).forEach(prop => mergeProp(prop))

  Object.keys(child).forEach(prop => !parent.hasOwnProperty(prop) && mergeProp(prop))

  return behavior
}

export default function Behavior (options) {
  let behaviors = options.behaviors

  if (!behaviors) {
    behaviors = []
  }

  let ret = {}

  behaviors = behaviors.filter(behavior => isPlainObject(behavior))
  behaviors.forEach(behavior => {
    ret = mergeBehavior(ret, behavior)
  })

  return mergeBehavior(ret, options)
}
