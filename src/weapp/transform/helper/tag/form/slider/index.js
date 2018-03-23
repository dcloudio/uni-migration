export default {
  name: 'slider',
  attr: {
    'min': 'min',
    'max': 'max',
    'step': 'step',
    'disabled': 'disabled',
    'value': 'value',
    'color': 'STYLE:color',
    'selected-color': 'STYLE:selected-color',
    'activeColor': 'STYLE:selected-color',
    'backgroundColor': 'STYLE:color'
  },
  event: { // 标签事件转换配置
    'change': 'change' // 事件名称
  }
}
