const rewriter = require('../../../util')

describe('style.declaration.border', () => {

  it('rewrite `border`', () => {
    const fixture = `
.test{
  border:1px solid #fff000;
}
.test2{
	border-top:1rpx solid red;
}
.test3{
	border-radius:50%;
}
`
    const expected = `.test{border:2px solid #fff000;}.test2{border-top-width:1px;border-style:solid;border-top-color:red;}.test3{border-radius:375px;}`

    rewriter.assertStyleString(fixture, expected)
  })

})