const rewriter = require('../../../util')

describe('template.tag.input', () => {

  it('rewrite `input`', () => {
    const fixture = `
    <input type="text" placeholder="输入内容" password="" disabled auto-focus value="input" bindinput="input" bindfocus="focus" placeholder-style="font-size:15px;color:#F76260"/>
`

    const expected = `<input style="placeholder-color:#F76260" class="u-w-input" type="password" placeholder="输入内容" disabled="true" value="input" onchange="$handlePageEvent('input',false,false)" onfocus="$handlePageEvent('focus',false,false)"></input>`

    rewriter.assertTemplateString(fixture, expected)
  })

})