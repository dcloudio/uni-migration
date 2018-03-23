const rewriter = require('../../../util')

describe('template.tag[rich-text]', () => {

  it('rewrite `rich-text` expr', () => {
    const fixture = `
    <rich-text nodes="{{nodes}}"></rich-text>
`

    const expected = `<richtext type="html" class="u-w-rich-text">{{$handleRichText(nodes)}}</richtext>`

    rewriter.assertTemplateString(fixture, expected)
  })

 it('rewrite `rich-text` string', () => {
    const fixture = `
    <rich-text nodes="<div><a>sdff</a></div>"></rich-text>
`

    const expected = `<richtext type="html" class="u-w-rich-text">{{$handleRichText('ESCAPE:%3Cdiv%3E%3Ca%3Esdff%3C/a%3E%3C/div%3E')}}</richtext>`

    rewriter.assertTemplateString(fixture, expected)
  })
})