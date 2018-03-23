const chai = require('chai')
const expect = chai.expect

const rewriter = require(__dirname.replace('test', 'lib') + '/style').default

describe('template.tag.style', () => {

  it('rewrite `style`', () => {
    const attr = {
      style: 'color:#fff;padding-left:1em;padding-top:1px;padding-bottom:1rpx;padding-right:{{paddingRight}}'
    }
    rewriter('style', attr)
    expect(attr.style).eql('color:#fff;padding-left:32px;padding-top:2px;padding-bottom:1px;padding-right:{{paddingRight}}')
  })

})