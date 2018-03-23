export default {
  'padding': (value, declaration, addDeclaration) => {
    // TODO padding 的 auto 会使用浏览器设定的值，直接忽略掉。
    // http://www.w3school.com.cn/jsref/prop_style_padding.asp
    if (~value.indexOf('auto')) {
      return 'I:'
    }
  },
  'padding-bottom': '',
  'padding-left': '',
  'padding-right': '',
  'padding-top': ''
}
