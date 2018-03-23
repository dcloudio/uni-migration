export default function rewriter (deps, options) {
  return deps.map(dep => {
    return `<import name="${dep.attributes.name}" src="${dep.attributes.src.replace('.wxml', options.ext.wxml)}"></import>`
  }).join('\r\n')
}
