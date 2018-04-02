export default {
  name: 'swiper', // 转换后的标签名称
  beforeAttr (node, {
    getAttr,
    addAttr
  }) {
    // 小程序默认不显示指示点，但是快应用默认是显示的。
    const indicator = getAttr('indicator-dots')
    if (!indicator) {
      addAttr('indicator-dots', false)
    }
  },
  attr: { // 标签属性转换配置
    'indicator-dots': 'indicator', // 将小程序swiper标签的indicator-dots属性转换为indicator
    'indicator-color': 'STYLE:indicator-color', // 将小程序swiper标签的indicator-color属性转换为style中的indicator-color
    'indicator-active-color': 'STYLE:indicator-selected-color',
    'autoplay': 'autoplay',
    'current': 'index',
    'current-item-id': 'E:请在转换后的swiper组件中配置`index`属性替换', // E:表示不支持该属性,且该属性会引发使用问题
    'interval': 'interval',
    'duration': 'I:',
    'circular': 'I:',
    'vertical': 'I:启用横向滚动替换', // I:表示不支持该属性,且该属性不会引发使用问题(可能样式会有差异)
    'previous-margin': 'I:',
    'next-margin': 'I:',
    'display-multiple-items': 'I:',
    'skip-hidden-item-layout': 'I:'
  },
  event: {
    'change': 'change'
  }
}
