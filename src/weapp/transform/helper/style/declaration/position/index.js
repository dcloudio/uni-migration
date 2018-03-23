import { getDeclarationValue } from '../../util'
export default {
  'bottom': '',
  // 'display': '',
  'display': (value, declaration, addDeclaration, rule) => {
    // TODO 暂时忽略掉不支持的情况
    if (!~['flex', 'none'].indexOf(value)) {
      return 'I:'
    }
    if (value === 'flex') { // 因全局设置了flex-direction:column,故,当display:flex且未指定direction,还原为默认值row
      if (!getDeclarationValue('flex-direction', rule)) {
        addDeclaration('flex-direction', 'row')
      }
    }
  },
  'left': '',
  //  'position': 'I:',
  'position': (value, declaration, addDeclaration) => {
    if (value === 'static') {
      declaration.value = 'none'
    } else if (value !== 'fixed') {
      return 'I:'
    }
  },
  'right': '',
  'top': '',
  'overflow': 'I:',
  'vertical-align': 'I:',
  'z-index': 'I:'
}
