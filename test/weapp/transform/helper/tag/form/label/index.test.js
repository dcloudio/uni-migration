const rewriter = require('../../../util')

describe('template.tag.label', () => {

  it('rewrite `label`', () => {
    const fixture = `
    <label for="input-id">
      <button id="input-id">button</button>
    </label>
`

    const expected = `<div class="u-w-label"><input id="input-id" class="u-w-button u-w-button-default" type="button" value="button"></input></div>`

    rewriter.assertTemplateString(fixture, expected)
  })

})