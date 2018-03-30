const rewriter = require('../../../util')

describe('template.tag.block', () => {

  it('rewrite `block`', () => {
    const fixture = `
<block wx:for="{{items}}">
</block> 
`

    const expected = `<div class="u-w-view" for="{{(index,item) in items}}"></div>`

    rewriter.assertTemplateString(fixture, expected)
  })

})