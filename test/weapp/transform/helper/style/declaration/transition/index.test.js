const rewriter = require('../../../util')

describe('style.declaration.transition', () => {

  it('rewrite `transition`', () => {
    const fixture = `
.test{
  width: 100px;
  transition: test;
  transition-property: width;
  transition-duration: 5s;
  transition-timing-function: linear;
  transition-delay: 2s;
}
`

    const expected = `.test{width:200px;}`

    rewriter.assertStyleString(fixture, expected)
  })

})