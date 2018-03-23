export default function addClass (clazz, node) {
  const attr = node.attributes
  attr['class'] = clazz + (attr['class'] ? (' ' + attr['class']) : '')
}
