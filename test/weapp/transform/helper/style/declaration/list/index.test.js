const rewriter = require('../../../util')

describe('style.declaration.list', () => {

  it('rewrite `list`', () => {
    const fixture = `
.test{
  list-style-image:url("/i/arrow.gif");
  list-style-type:square;
  list-style-type:circle;
  list-style:square inside url('/i/arrow.gif');
}
`

    const expected = `.test{}`

    rewriter.assertStyleString(fixture, expected)
  })

})