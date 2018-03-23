export default {
  name: 'input',
  beforeAttr (node, {
    getAttr,
    addAttr
  }) {
    //		let content = node.content;
    //		if(content) {
    //			let children = node.parent.children;
    //			for(let i = 0; i < children.length; i++) {
    //				if(children[i] == node) {
    //					node.parent.children.splice((i+1), 0, {
    //						name: 'text',
    //						content: content,
    //						attributes: {
    //							class: 'u-w-text'
    //						},
    //						children: []
    //					})
    //					delete node.content;
    //					break;
    //				}
    //			}
    //		}
  },
  afterAttr (node, {
    addAttr
  }) {
    addAttr('type', 'checkbox')
  },
  attr: { // 标签属性转换配置
    'value': 'value',
    'name': 'name', // 快应用专有的属性
    'checked': 'checked',
    'disabled': 'disabled',
    'color': 'STYLE:color'
  },
  event: {
    'linechange': '',
    'confirm': '',
    'focus': 'focus',
    'blur': 'blur',
    'input': 'change'
  }
}
