import { isExpr } from '../../../../../../utils'
export default {
  name (node) {
    if (node.attributes.is) {
      return 'import-' + node.attributes.is.toLowerCase()
    }
    return node.name
  },
  attr: {
    is: '',
    data: (value, attr) => {
      if (isExpr(value)) {
        value = value.substr(2, value.length - 4)
        if (value.indexOf('...') === 0) {
          attr['data'] = '{{' + value.replace('...', '') + '}}'
        } else if (!~value.indexOf(':') && !~value.indexOf(',')) {
          attr['data'] = '{{' + value + ':' + value + '}}'
        }
      }
    }
  }
}
