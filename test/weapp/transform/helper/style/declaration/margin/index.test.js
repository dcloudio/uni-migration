const rewriter = require('../../../util')

describe('style.declaration.margin', () => {

  it('rewrite `margin`', () => {
    const fixture = `
.test{
  margin:0 auto;
  margin-top:10px;
  margin-bottom:10px;
  margin-left:10px;
  margin-right:10px;
}
`

    const expected = `.test{margin-top:20px;margin-bottom:20px;margin-left:20px;margin-right:20px;}`

    rewriter.assertStyleString(fixture, expected)
  })

})