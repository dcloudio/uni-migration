const rewriter = require('../../../util')

describe('style.declaration.box', () => {

  it('rewrite `box`', () => {
    const fixture = `
.test{
  float:left;
  box-sizing:border-box;
}
.test2{
	-webkit-box-align: center;
	box-align: start;
}
`
    const expected = `.test{}.test2{align-items:center;align-items:flex-start;}`

    rewriter.assertStyleString(fixture, expected)
  })

})