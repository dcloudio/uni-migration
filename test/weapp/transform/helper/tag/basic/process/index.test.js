const rewriter = require('../../../util')

describe('template.tag.process', () => {

  it('rewrite `process`', () => {
    const fixture = `
    <progress percent="20" show-info active activeColor="#ff3333" stroke-width="12" />
`

    const expected = `<progress class="u-w-progress" percent="20" style="color:#ff3333;stroke-width:12"></progress>`

    rewriter.assertTemplateString(fixture, expected)
  })

})