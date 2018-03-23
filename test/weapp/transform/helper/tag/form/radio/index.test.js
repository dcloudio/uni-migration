const rewriter = require('../../../util')

describe('template.tag.radio', () => {

  it('rewrite `radio`', () => {
    const fixture = `
<label class="radio">
        <radio value="r1" checked="true" dtest="test"/>选中
      </label>
    </view>
`

    const expected = `<div class="u-w-label radio"><input class="u-w-radio" value="r1" checked="true" name="test" type="radio"></input><text class="u-w-text">选中</text></div>`

    rewriter.assertTemplateString(fixture, expected)
  })

})