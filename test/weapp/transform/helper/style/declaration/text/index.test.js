const rewriter = require('../../../util')

describe('style.declaration.text', () => {

  it('rewrite `text`', () => {
    const fixture = `
button{
  color: #ff3333;
  line-height: 10px;
  text-align: center;
  text-decoration: overline;
  text-overflow: clip;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
}
.test{
	text-align: left;
	text-align: -webkit-match-parent;
}
`

    const expected = `.u-w-button{color:#ff3333;line-height:20px;text-align:center;text-overflow:clip;lines:1;}.test{text-align:left;}`

    rewriter.assertStyleString(fixture, expected)
  })

})