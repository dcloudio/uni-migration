const rewriter = require('../../../util')

describe('style.declaration.background', () => {

  it('rewrite `background`', () => {
    const fixture = `
.test{
  background: linear-gradient(45deg, color-stop1, color-stop2);
}
.test2{
	background:#fff000;
	background:url(../img.png);
}
.test3{
	background:url(../img.png);
}
.test4{
  background: linear-gradient(top, #222, #333);
}
`
    const expected = `.test{background:linear-gradient(45deg, color-stop1, color-stop2);}.test2{background-color:#fff000;background-image:url(../img.png);}.test3{background-image:url(../img.png);}.test4{background:linear-gradient(to top, #222, #333);}`

    rewriter.assertStyleString(fixture, expected)
  })

})