const rewriter = require('../../../util')

describe('template.tag[web-view]', () => {

  it('rewrite `web-view`', () => {
    const fixture = `
<web-view src="https://mp.weixin.qq.com/" bindmessage="viewMessage"></web-view>
`

    const expected = `<web class="u-w-web-view" src="https://mp.weixin.qq.com/"></web>`

    rewriter.assertTemplateString(fixture, expected)
  })

})