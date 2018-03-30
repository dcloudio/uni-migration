export default {
  'background': (value, declaration, addDeclaration) => {
    // TODO 只做了简单转换，把线性转了，把第一个值转成了color，image，还有很多属性没转
    if (~value.indexOf('linear-gradient')) { // 线性
      // 按照指定方向渐变时，必须有to在direction前。
      var DIR_REG = /linear\-gradient\((top|right|bottom|left)/
      var ret = value.match(DIR_REG)
      if (ret) {
        declaration.value = value.replace(DIR_REG, 'linear-gradient(to ' + ret[1])
      }
      return ''
    }
    const values = value.split(' ')
    if (~values[0].indexOf('url')) {
      addDeclaration('background-image', value)
    } else {
      // TODO 颜色值为transparent时忽略
      if (!~value.indexOf('transparent')) {
        addDeclaration('background-color', value)
      }
    }
    return 'I:'
  },
  'background-color': (value, declaration, addDeclaration) => {
    if (~value.indexOf('transparent')) {
      return 'I:'
    }
  },
  'background-image': '',
  'background-size': '',
  'background-repeat': 'I:',
  'background-attachment': 'I:',
  'background-position': 'I:',
  'background-origin': 'I:',
  'background-clip': 'I:'
}
