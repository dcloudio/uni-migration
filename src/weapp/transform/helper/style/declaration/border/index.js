function valueType (value) {
  const styles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
  if (/px/ig.test(value)) {
    return 'width'
  } else if (~styles.indexOf(value)) {
    return 'style'
  } else {
    return 'color'
  }
}

function setStyle (direction, value, addDeclaration) {
  const values = value.split(' ')
  for (let i = 0, length = values.length; i < length; i++) {
    const borderProperty = `border-${direction}-${valueType(values[i])}`
    if (/\S+style$/.test(borderProperty)) {
      addDeclaration('border-style', values[i])
    } else {
      addDeclaration(borderProperty, values[i])
    }
  }
  return 'I:'
}

export default {
  'border': '',
  'border-color': '',
  'border-style': '',
  'border-width': '',
  'border-radius': (value, declaration, addDeclaration) => { // width也不支持百分数，后期在转换
    if (~value.indexOf('%')) {
      value = 7.50 * parseInt(value) + 'px'
    }
    addDeclaration('border-radius', value)
    return 'I:'
  },
  'border-top': (value, declaration, addDeclaration) => {
    return setStyle('top', value, addDeclaration)
  },
  'border-bottom': (value, declaration, addDeclaration) => {
    return setStyle('bottom', value, addDeclaration)
  },
  'border-left': (value, declaration, addDeclaration) => {
    return setStyle('left', value, addDeclaration)
  },
  'border-right': (value, declaration, addDeclaration) => {
    return setStyle('right', value, addDeclaration)
  },
  'border-left-width': '',
  'border-right-width': '',
  'border-top-width': '',
  'border-bottom-width': '',
  'border-left-color': '',
  'border-right-color': '',
  'border-top-color': '',
  'border-bottom-color': '',
  'border-left-radius': '',
  'border-right-radius': '',
  'border-top-radius': '',
  'border-bottom-radius': '',
  'border-top-style': 'I:',
  'border-bottom-style': 'I:',
  'border-left-style': 'I:',
  'border-right-style': 'I:'
}
