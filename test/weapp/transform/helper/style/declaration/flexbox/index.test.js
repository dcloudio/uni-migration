const rewriter = require('../../../util')

describe('style.declaration.flexbox', () => {

  it('rewrite `flexbox`', () => {
    const fixture = `
.test{
  justify-content:space-around;
  justify-content:space-between;
}
`
    const expected = `.test{justify-content:space-between;justify-content:space-between;}`

    rewriter.assertStyleString(fixture, expected)
  })

})