const path = require('path')
const chai = require('chai')
const expect = chai.expect

const parse = require(__dirname.replace('test', 'lib') + '/include').default

const fs = {
  existsSync(path) {
    return true
  },
  readFileSync(path) {
    if (~path.indexOf('view.wxml')) {
      return viewXml
    } else if (~path.indexOf('head.wxml')) {
      return headXml
    } else if (~path.indexOf('foot.wxml')) {
      return footXml
    }
    throw new Error('`' + path + '` 不存在')
  }
}

const viewXml = `
<wxs module="m1">
</wxs>
<template name="msgItem">
</template>
<include src="../../../common/head.wxml" />
<view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
</view>
    `

const headXml = `
<view class="page-head">
  <include src="foot.wxml" />
  <view class="page-head-title">{{title}}</view>
  <view class="page-head-line"></view>
  <view wx:if="{{desc}}" class="page-head-desc">{{desc}}</view>
</view>
`
const footXml = `
<navigator class="page-foot" openType="switchTab" url="/page/component/index" hover-class="none">
  <image class="icon-foot" src="../../../../image/icon_foot.png"></image>
</navigator>
`
describe('template.include', () => {

  it('parse `include`', () => {
    const pagePath = path.join(__dirname, '../../../../../demo/weapp/input/page/component/pages/view/view.wxml')
    const ret = parse(viewXml, pagePath, {}, fs)
    expect(ret.nodes.length).eql(2)
    expect(ret.nodes[0].attributes.class).eql('page-head')
    expect(ret.nodes[0].children[0].name).eql('navigator')
    expect(ret.nodes[1].children[0].name).eql('text')
  })

})