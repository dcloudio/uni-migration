const rewriter = require('../../../util')

describe('template.tag.textarea', () => {

  it('rewrite `textarea`', () => {
    const fixture = `
<textarea value="多行输入框" placeholder="placeholder颜色是红色的" placeholder-style="color:red;" placeholder-class="test" disabled="false" maxlength="140"
 auto-focus="false" focus="false" auto-height="false" fixed="false" cursor-spacing="0" cursor="0" show-confirm-bar="true" selection-start="-1" selection-end="-1"
  bindfocus="" bindblur="" bindlinechange="" bindinput="" bindconfirm="">
</textarea> 
`

    const expected = `<textarea style="placeholder-color:red" class="u-w-textarea" placeholder="placeholder颜色是红色的" disabled="false" onfocus="$handlePageEvent('',false,false)" onblur="$handlePageEvent('',false,false)" onchange="$handlePageEvent('',false,false)"></textarea>`

    rewriter.assertTemplateString(fixture, expected)
  })

})