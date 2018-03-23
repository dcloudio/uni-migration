const rewriter = require('../../../util')

describe('style.declaration.background', () => {

  it('rewrite `background`', () => {
    const fixture = `
.test{
  background: linear-gradient(angle, color-stop1, color-stop2);
}
.test2{
	background:#fff000;
	background:url(../img.png);
}
.test3{
	background:url(../img.png);
}
`
    const expected = `.test{background:linear-gradient(angle, color-stop1, color-stop2);}.test2{background-color:#fff000;background-image:url(../img.png);}.test3{background-image:url(../img.png);}`

    rewriter.assertStyleString(fixture, expected)
  })

})