const rewriter = require('../../../util')

describe('template.tag.text', () => {

  it('rewrite `text`', () => {
    const fixture = `
    <text selectable="{{selectable}}" space="{{space}}" decode="{{decode}}">hello</text>
`

    const expected = `<text class="u-w-text">hello</text>`

    rewriter.assertTemplateString(fixture, expected)
  })

})