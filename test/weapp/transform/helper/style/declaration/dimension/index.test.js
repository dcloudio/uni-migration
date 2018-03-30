const rewriter = require('../../../util')

describe('style.declaration.dimension', () => {

  it('rewrite `dimension`', () => {
    const fixture = `
.test{
	width:10rpx;
	height:auto;
	width:20rpx!important;
}
`
    const expected = `.test{width:10px;width:20px;display:flex;}`

    rewriter.assertStyleString(fixture, expected)
  })

})