const rewriter = require('../../../util')

describe('style.declaration.animation', () => {

  it('rewrite `animation`', () => {
    const fixture = `
.test{
	animation: mymove  5s   infinite ;
  animation-name:move;
  animation-direction:asd;
  animation-fill-mode:ss;
  animation-fill-mode:none;
	animation: circle infinite 1.5s linear;
}
`
    const expected = `.test{animation-name:move;animation-fill-mode:none;animation-name:mymove;animation-duration:5s;animation-iteration-count:infinite;animation-name:circle;animation-iteration-count:infinite;animation-duration:1.5s;animation-timing-function:linear;}`

    rewriter.assertStyleString(fixture, expected)
  })

})