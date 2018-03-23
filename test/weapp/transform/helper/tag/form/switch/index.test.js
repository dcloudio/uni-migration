const rewriter = require('../../../util')

describe('template.tag.switch', () => {

  it('rewrite `switch`', () => {
    const fixture = `
<switch checked bindchange="switch1Change" type='checkbox'/>
`

    const expected = `<switch class="u-w-switch" checked="true" onchange="$handlePageEvent('switch1Change',false,false)"></switch>`

    rewriter.assertTemplateString(fixture, expected)
  })

})