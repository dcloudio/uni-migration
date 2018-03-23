export default {
  'flex': (value, declaration, addDeclaration) => {
    // TODO 处理缩写时，第三个参数写为auto的情况。
    if (~value.indexOf('auto')) {
      return 'I:'
    }
  },
  'flex-grow': '',
  'flex-shrink': '',
  'flex-basis': '',
  'flex-direction': (value, declaration, addDeclaration) => {
    if (~value.indexOf('row-reverse')) {
      return 'I:'
    }
  },
  'flex-wrap': '',
  'justify-content': (value, declaration, addDeclaration) => {
    const content = ['flex-start', 'flex-end', 'center', 'space-between']
    if (~content.indexOf(value)) { // justify-content:space-around
      return ''
    }
    return 'I:'
  },
  'align-items': '',
  'align-content': ''
}
