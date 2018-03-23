const rewriter = require('../../helper/util')

describe('template.tag.class', () => {

  it('rewrite `class` 无class', () => {
    rewriter.assertTemplateString('<view></view>', '<div class="u-w-view"></div>')
  })
  it('rewrite `class` 静态class', () => {
    rewriter.assertTemplateString('<view class="test"></view>', '<div class="u-w-view test"></div>')
  })
  it('rewrite `class` 动态class', () => {
    rewriter.assertTemplateString('<view class="{{test}}"></view>', '<div class="u-w-view {{test}}"></div>')
  })

})