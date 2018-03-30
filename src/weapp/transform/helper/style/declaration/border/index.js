function valueType(value) {
  const styles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
  // 需要考虑到0px简写为0的情况，否则会当作color处理。
  if (/px/ig.test(value) || parseInt(value) === 0) {
    return 'width'
  } else if (~styles.indexOf(value)) {
    return 'style'
  } else {
    return 'color'
  }
}

function setStyle(direction, value, addDeclaration) {
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
      // 其实应当按照当前组件的宽高为基准计算，但这里拿不到，暂时这样处理下。
      value = 750 / 100 * parseInt(value) + 'px'
      declaration.value = value
    }
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