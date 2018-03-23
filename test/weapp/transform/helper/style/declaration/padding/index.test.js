const rewriter = require('../../../util')

describe('style.declaration.padding', () => {

  it('rewrite `padding`', () => {
    const fixture = `
.test{
  padding:5px auto;
  padding-top:10px;
  padding-bottom:10px;
  padding-left:10px;
  padding-right:10px;
}
`

    const expected = `.test{padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;}`

    rewriter.assertStyleString(fixture, expected)
  })

})