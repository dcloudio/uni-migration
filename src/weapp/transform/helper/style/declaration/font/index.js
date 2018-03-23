export default {
  'font-size': (value, declaration, addDeclaration) => {
    if (~value.indexOf('inherit')) {
      return 'I:'
    }
  },
  'font-weight': (value, declaration, addDeclaration) => {
    if (value === 400) {
      declaration.value = 'normal'
    } else if (value > 400) {
      declaration.value = 'bold'
    } else {
      return 'I:'
    }
  },
  'font-style': '',
  'font-family': 'I:',
  'font-variant': 'I:'
}
