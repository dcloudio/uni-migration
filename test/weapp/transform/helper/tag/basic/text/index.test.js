const rewriter = require('../../../util')

describe('template.tag.text', () => {

  it('rewrite `text`', () => {
    const fixture = `<text>123</text><text selectable="{{selectable}}" space="{{space}}" decode="{{decode}}"><text>123</text></text>
`

    const expected = `<text class="u-w-text">123</text>\r\n<text class="u-w-text"><span class="u-w-text">123</span></text>`

    rewriter.assertTemplateString(fixture, expected)
  })

})