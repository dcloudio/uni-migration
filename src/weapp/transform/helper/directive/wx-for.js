import { isExpr } from '../../../../utils'

export default function rewriter (node) {
  if (!node.$forProcessed) {
    node.$forProcessed = true
    const attrs = node.attributes
    let wxFor = ''
    let wxForIndex = 'index'
    let wxForItem = 'item'
    let wxKey = ''
    Object.keys(attrs).forEach(name => {
      switch (name) {
        case 'wx:for':
        case 'wx:for-items':
          wxFor = attrs[name]
          delete attrs[name]
          break
        case 'wx:for-index':
          wxForIndex = attrs[name]
          delete attrs[name]
          break
        case 'wx:for-item':
          wxForItem = attrs[name]
          delete attrs[name]
          break
        case 'wx:key':
          wxKey = attrs[name]
          delete attrs[name]
          break
      }
    })

    if (isExpr(wxFor)) {
      wxFor = wxFor.substr(2, wxFor.length - 4)
    }
    attrs['for'] = `{{(${wxForIndex},${wxForItem}) in ${wxFor}}}`
    if (wxKey && !~wxKey.indexOf('*')) {
      attrs['tid'] = wxKey
    }
  }
}
