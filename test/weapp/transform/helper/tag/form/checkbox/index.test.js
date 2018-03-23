const rewriter = require('../../../util')

describe('template.tag.checkbox', () => {

  it('rewrite `checkbox`', () => {
    const fixture = `
<label class="checkbox">
    <checkbox value="cb" />选中
  </label>
`

    const expected = `<div class="u-w-label checkbox"><input class="u-w-checkbox" value="cb" type="checkbox"></input><text class="u-w-text">选中</text></div>`

    rewriter.assertTemplateString(fixture, expected)
  })

})