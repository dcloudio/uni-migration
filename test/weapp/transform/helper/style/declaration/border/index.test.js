const rewriter = require('../../../util')

describe('style.declaration.border', () => {

  it('rewrite `border`', () => {
    const fixture = `
.test{
  border:1px solid #fff000;
	border-bottom: none;
}
.test2{
	border-top:1rpx solid red;
}
.test3{
	border-radius:50%;
	border-left:0;
	border-right:0;
	border: none;
}
`
    const expected = `.test{border:2px solid #fff000;border-bottom-width:0;}.test2{border-top-width:1px;border-style:solid;border-top-color:red;}.test3{border-radius:375px;border:0;border-left-width:0;border-right-width:0;}`

    rewriter.assertStyleString(fixture, expected)
  })

})