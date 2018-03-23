const rewriter = require('../../../util')

describe('template.tag.image', () => {

  it('rewrite `image`', () => {
    const fixture = `
<image src="1.jpg" mode="scaleToFill" lazy-load="false" binderror="imgError" bindload="imgLoad">
</image> 
`

    const expected = `<image class="u-w-image" src="1.jpg" style="resize-mode:stretch"></image>`

    rewriter.assertTemplateString(fixture, expected)
  })

})