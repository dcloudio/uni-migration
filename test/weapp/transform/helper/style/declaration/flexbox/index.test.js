const rewriter = require('../../../util')

describe('style.declaration.flexbox', () => {

  it('rewrite `flexbox`', () => {
    const fixture = `
.test{
  justify-content:space-around;
  justify-content:space-between;
}
.test1{
  flex: 1 2 auto;
}
.test2{
  flex: 0 1 50%;
}
`
    const expected = `.test{justify-content:space-between;justify-content:space-between;}.test1{flex-grow:1;flex-shrink:2;}.test2{flex-grow:0;flex-shrink:1;}`

    rewriter.assertStyleString(fixture, expected)
  })

})