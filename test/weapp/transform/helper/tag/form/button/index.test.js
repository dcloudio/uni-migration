const rewriter = require('../../../util')

describe('template.tag.button', () => {

  it('rewrite `button`', () => {
    const fixture = `
    <button type="default" size="default" plain loading disabled bindgetphonenumber="getPhoneNumber">button</button>
`

    const expected = `<input class="u-w-button u-w-button-default" disabled="true" type="button" value="button"></input>`

    rewriter.assertTemplateString(fixture, expected)
  })

})