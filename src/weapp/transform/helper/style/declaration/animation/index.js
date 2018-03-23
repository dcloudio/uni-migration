export default {
  'animation': (value, declaration, addDeclaration) => {
    if (~value.indexOf('steps')) {
      value = value.replace(/steps.+end\)/, 'linear')
      // console.log("不支持steps()样式");
    }
    const list = value.split(/\s+/)
    switch (list.length) {
      case 1:
        addDeclaration('animation-name', list[0])
        break
      case 2:
        addDeclaration('animation-name', list[0])
        addDeclaration('animation-duration', list[1])
        break
      case 3:
        addDeclaration('animation-name', list[0])
        addDeclaration('animation-duration', list[1])
        addDeclaration('animation-timing-function', list[2])
        break
      case 4:
        addDeclaration('animation-name', list[0])
        addDeclaration('animation-duration', list[1])
        addDeclaration('animation-timing-function', list[2])
        if (list[3] === 'infinite') {
          addDeclaration('animation-iteration-count', list[3])
        } else {
          addDeclaration('animation-delay', list[3])
        }
        break
      case 5:
        addDeclaration('animation-name', list[0])
        addDeclaration('animation-duration', list[1])
        addDeclaration('animation-timing-function', list[2])
        addDeclaration('animation-delay', list[3])
        addDeclaration('animation-iteration-count', list[4])
        break
      case 6:
        addDeclaration('animation-name', list[0])
        addDeclaration('animation-duration', list[1])
        addDeclaration('animation-timing-function', list[2])
        addDeclaration('animation-delay', list[3])
        addDeclaration('animation-iteration-count', list[4])
        break
      default:
    }
    return 'I:'
  },
  'animation-name': '',
  'animation-duration': '',
  'animation-timing-function': (value, declaration, addDeclaration) => {
    const cont = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']
    if (~cont.indexOf(value)) {
      return ''
    }
    return 'I:'
  },
  'animation-delay': '',
  'animation-iteration-count': (value, declaration, addDeclaration) => {
    if (value === 'infinite') {
      return 'I:'
    }
    return ''
  },
  'animation-direction': 'I:',
  'animation-fill-mode': (value, declaration, addDeclaration) => {
    const list = ['none', 'forwards']
    if (~list.indexOf(value)) {
      return ''
    }
    return 'I:'
  }
}
