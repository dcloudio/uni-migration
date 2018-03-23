export default {
  name (node) {
    if (node.attributes.is) {
      return 'import-' + node.attributes.is.toLowerCase()
    }
    return node.name
  },
  attr: {
    is: '',
    data: ''
  }
}
