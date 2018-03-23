import { isExpr } from '../../../../../../utils'

export default {
  name: 'div',
  beforeAttr (node, {
    getAttr,
    addAttr
  }) {
    if (getAttr('url')) {
      let openType = getAttr('open-type', 'navigate')
      if (isExpr(openType)) {
        openType = openType.substr(2, openType.length - 4)
        addAttr('bindtap', `$handleRouterEvent(${openType})`)
      } else {
        addAttr('bindtap', `$handleRouterEvent('${openType}')`)
      }
    }
  },
  attr: { // 标签属性转换配置
    url: 'data-url'
  }
}
