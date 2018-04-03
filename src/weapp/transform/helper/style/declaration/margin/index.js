function setAutovalue (value) {
  if (~value.indexOf('auto')) {
    // TODO 待处理
    return 'I:'
  }
  return ''
}

export default {
//   'margin': (value, declaration, addDeclaration) => {
//     if (~value.indexOf('auto')) {
//       // TODO 待处理
//       return 'I:'
//     }
//   },
  'margin': (value, declaration, addDeclaration) => {
    return setAutovalue(value)
  },
  'margin-bottom': (value, declaration, addDeclaration) => {
    return setAutovalue(value)
  },
  'margin-left': (value, declaration, addDeclaration) => {
    return setAutovalue(value)
  },
  'margin-right': (value, declaration, addDeclaration) => {
    return setAutovalue(value)
  },
  'margin-top': (value, declaration, addDeclaration) => {
    return setAutovalue(value)
  }
}
