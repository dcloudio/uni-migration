const rewriter = require('../../../util')

describe('style.declaration.font', () => {

  it('rewrite `font`', () => {
    const fixture = `
.test{
  font-size:20px;
  font-weight:500;
  font-style:italic;
  font-family:serif;
  font-variant:small-caps;
}
`

    const expected = `.test{font-size:40px;font-weight:bold;font-style:italic;}`

    rewriter.assertStyleString(fixture, expected)
  })

})