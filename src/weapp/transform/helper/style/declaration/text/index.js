export default {
  'color': (value, declaration, addDeclaration) => {
    if (~value.indexOf('inherit')) {
      return 'I:'
    }
  },
  'line-height': '',
  'text-align': (value, declaration, addDeclaration) => {
    const valueData = ['left', 'right', 'center']
    const flexData = ['flex-start', 'flex-end', 'center']
    if (!~valueData.indexOf(value)) {
      return 'I:'
    } else {
      const index = valueData.indexOf(value)
      addDeclaration('align-items', flexData[index])
      addDeclaration('justify-content', flexData[index])
    }
  },
  'text-decoration': (value, declaration, addDeclaration) => {
    if (~['overline', 'blink'].indexOf(value)) {
      return 'I:'
    }
  },
  'text-overflow': (value, declaration, addDeclaration) => {
    // 在设置了行数的情况下生效
    if (value) {
      addDeclaration('lines', '1')
    }
  },
  'white-space': 'I:',
  'word-wrap': 'I:',
  'word-break': 'I:',
  'text-align-last': 'I:',
  'line-clamp': 'I:'
}
