const rewriter = require('../../../util')

describe('template.tag.slider', () => {

  it('rewrite `slider`', () => {
    const fixture = `
<slider value="50" min='1' bindchange="slider3change"  bindchanging="slider3change" block-size="28" show-value="true" disabled="true" color="#fff000" selected-color="red"/>
`

    const expected = `<slider class="u-w-slider" value="50" min="1" onchange="$handlePageEvent('slider3change',false,false)" disabled="true" style="color:#fff000;selected-color:red"></slider>`

    rewriter.assertTemplateString(fixture, expected)
  })

})