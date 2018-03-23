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
`

    const expected = `.u-w-button{color:#ff3333;line-height:20px;text-align:center;text-overflow:clip;align-items:center;justify-content:center;lines:1;}`

    rewriter.assertStyleString(fixture, expected)
  })

})