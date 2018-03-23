const path = require('path')
const fs = require('fs-extra')
const chai = require('chai')
const expect = chai.expect

const parse = require(__dirname.replace('test', 'lib') + '/parser').default

describe('manifest', () => {
  it('template parser', () => {
    const template = `
<import src="../../../common/head.wxml" />
<import src="../../../common/foot.wxml" />

<view class="container">
  <template is="head" data="{{title: 'downloadFile'}}" />

  <view class="page-body">
    <image wx:if="{{imageSrc}}" src="{{imageSrc}}" mode="center" />
    <block wx:else>
      <view class="page-body-wording">
        <text class="page-body-text">
          点击按钮下载服务端示例图片
        </text>
      </view>
      <view class="btn-area">
        <button bindtap="downloadImage" type="primary">下载</button>
      </view>
    </block>
  </view>

  <template is="foot" />
</view>
    `
    const ret = parse(`<root>${template}</root>`)
    expect(ret.children.length).eql(3)
    expect(ret.children[2].children.length).eql(3)
    expect(ret.children[2].children[1].children.length).eql(2)
    expect(ret.children[2].children[1].children[1].children.length).eql(2)
  })

  it('template[import] parser', () => {
    const template = `
<!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>
    `
    const ret = parse(`${template}`)
    expect(ret.attributes.name).eql('item')

  })

})