const rewriter = require('../../../util')

describe('style.declaration.position', () => {

  it('rewrite `position`', () => {
    const fixture = `
.test1{
  top:10px;
  right:10px;
  display:inline-block;
  position:relative;
  overflow:scroll;
  vertical-align:middle;
  z-index:998;
}
.test2{
  display:flex;
  position:static;
  top:10px;
}
`

    const expected = `.test1{top:20px;right:20px;}.test2{display:flex;position:none;top:20px;flex-direction:row;}`

    rewriter.assertStyleString(fixture, expected)
  })

})