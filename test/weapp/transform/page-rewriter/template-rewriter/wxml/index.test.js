const path = require('path')
const chai = require('chai')
const expect = chai.expect

const parse = require(__dirname.replace('test', 'lib')).default
const rewriteNode = require(path.join(__dirname.replace('test', 'lib'),'../node')).default

const fs = {
  existsSync(path) {
    return true
  },
  readFileSync(path) {
    return ''
  }
}

const entryCode = `
<!-- dairy.wxml -->

<!-- 单条内容 -->
<template name="content-item">
  <block wx:if="{{content.type == 'TEXT'}}">
    <view style="margin-top:30rpx">
      <text wx:if="{{content.type == 'TEXT'}}" class="text">{{content.content}}</text>
    </view>
  </block>
  <block wx:if="{{content.type == 'IMAGE'}}">
    <image class="media" mode="aspectFill" src="{{content.content}}" bindtap="enterPreviewMode" data-src="{{content.content}}"></image>
    <view style="margin-top: 10rpx">{{content.description}}</view>
  </block>
  <block wx:if="{{content.type == 'VIDEO'}}">
    <video class="media" src="{{content.content}}"></video>
    <view style="margin-top: 10rpx">{{content.description}}</view>
  </block>
  <template is="content-footer" data="{{content}}"></template>
</template>

<!-- 日记正文footer -->
<template name="content-footer">
  <view class="footer">
    <view class="left">
      <image mode="aspectFit" src="../../images/icons/poi.png"></image>
      <text style="margin-left:10rpx;">{{content.poi.name}}</text>
    </view>
    <view class="right">
      <image mode="aspectFit" src="../../images/icons/comment.png"></image>
      <view>{{content.commentNum}}</view>
    </view>
    <view class="right">
      <image mode="aspectFit" src="../../images/icons/like.png"></image>
      <view>{{content.likeNum}}</view>
    </view>
  </view>
</template>

<view class="container">
  <view class="header" style="background-image:url({{diary.meta.cover}})">
    <!--顶部固定工具栏-->
    <view class="toolbar">
      <image class="item" mode="aspectFit" wx:for="{{toolbar}}" src="{{item}}"></image>
    </view>

    <!--日记meta信息区-->
    <view class="title">
      <image class="avatar" mode="aspectFit" src="{{diary.meta.avatar}}"> </image>
      <view class="desc">
          <view class="item">{{diary.meta.title}}</view>
          <view class="item">{{diary.meta.meta}}</view>
      </view>
    </view>
  </view>

  <!--日记正文-->
  <view wx:for="{{diary.list}}" wx:for-item="content" class="content">
    <template is="content-item" data="{{content}}"></template>
  </view>

  <view id="footer">
    <view class="container">
      <view class="item" style="font-size:50rpx;">
        <view style="display:inline-block">THE</view>
        <view style="display:inline-block;margin-left:10rpx;color:#2EA1CA;">END</view>
      </view>
      <view class="item" style="font-size:24rpx;color:gray">DESIGNED BY 小闹钟</view>
    </view>
  </view>
</view>

<!-- 预览模式 -->
<swiper class="swiper-container" duration="400" current="{{previewIndex}}" bindtap="leavePreviewMode" style="display:{{previewMode ? 'block' : 'none'}};">
  <block wx:for="{{mediaList}}" wx:for-item="media">
    <swiper-item>
      <image src="{{media.content}}" mode="aspectFit"></image>
    </swiper-item>
  </block>
</swiper>

`

describe('template.include', () => {

  it('parse `include`', () => {
    const inputPath = path.join(__dirname, 'input')
    const outputPath = path.join(__dirname, 'output')
    const pagePath = path.join(__dirname, 'input/entry/entry.wxml')
    const output = {
      input: inputPath,
      output: outputPath,
      ext: {
        wxs: '.js',
        wxml: '.ux',
        wxss: '.css',
        app: '.ux'
      }
    }
    const ret = parse(entryCode, pagePath, output, fs, true)
    expect(output.ret.entry.nodes[0].name).eql('import')
    Object.keys(output.ret.deps).forEach(page => {
      if (~page.indexOf('content-item')) {
        expect(output.ret.deps[page].nodes[0].name).eql('import')
      }
    })

  })

})