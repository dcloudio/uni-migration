const chai = require('chai')
const expect = chai.expect

const util = require('../../../../util')

const rewriter = require(__dirname.replace('test', 'lib')).default

describe('style', () => {
  it('parse `@import`', () => {
    const wxss = `
@import "../../../common/lib/weui.wxss";

label {
  display: inline-block;
  min-width: 270rpx;
  margin-right: 20rpx;
}
form:after{
  width: 100%;
}
.picker-text {

}

`
    const ret = rewriter(wxss, {
      ext: {
        wxss: '.nss'
      }
    })
    expect(ret.deps[0]).eql('../../../common/lib/weui.nss')
  })

})