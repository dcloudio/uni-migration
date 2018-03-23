const rewriter = require('../../../util')

describe('template.tag.icon', () => {

  it('rewrite `icon`', () => {
    const fixture = `
    <icon type="{{type}}" size="12" color="{{color}}"/>
`

    const expected = `<image class="u-w-icon" style="width:12;height:12"></image>`

    rewriter.assertTemplateString(fixture, expected)
  })

})