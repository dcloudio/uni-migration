const rewriter = require('../../../util')

describe('style.declaration.dimension', () => {

  it('rewrite `dimension`', () => {
    const fixture = `
.test{
	width:10rpx;
	height:auto;
}
`
    const expected = `.test{width:10px;display:flex;}`

    rewriter.assertStyleString(fixture, expected)
  })

})