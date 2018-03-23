const rewriter = require('../../../util')

describe('template.tag.view', () => {

  it('rewrite `view`', () => {
    const fixture = `
    <view hover-class="{{hoverClass}}" hover-stop-propagation="{{hoverStopPropagation}}" hover-start-time="{{hoverStartTime}}" hover-stay-time="{{hoverStayTime}}">
    </view>
`

    const expected = `<div class="u-w-view"></div>`

    rewriter.assertTemplateString(fixture, expected)
  })

})