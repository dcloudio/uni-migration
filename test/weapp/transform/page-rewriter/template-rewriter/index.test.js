const path = require('path')
const chai = require('chai')
const expect = chai.expect

const rewrite = require(__dirname.replace('test', 'lib')).default

const outputFiles = {}
const fs = {
  existsSync(path) {
    if (~path.indexOf('.nml')) {
      return outputFiles[path]
    }
    return true
  },
  readFileSync(path) {
    if (~path.indexOf('view.wxml')) {
      return viewXml
    } else if (~path.indexOf('head.wxml')) {
      return headXml
    } else if (~path.indexOf('foot.wxml')) {
      return footXml
    } else if (~path.indexOf('include1.wxml')) {
      return include1Xml
    } else if (~path.indexOf('include2.wxml')) {
      return include2Xml
    }
  }
}

const viewXml = `
<wxs module="m1">
var getMax = function(array) {
  var max = undefined;
  for (var i = 0; i < array.length; ++i) {
    max = max === undefined ?
      array[i] :
      (max >= array[i] ? max : array[i]);
  }
  return max;
}

module.exports.getMax = getMax;
</wxs>
<wxs module="m2">
alert(12);
</wxs>
<wxs module="m3" src="../../../common/m3.wxs">
</wxs>
<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>

<include src="../../../common/include1.wxml" />
<view class="container">
  <import src="../../../common/head.wxml" />
  <template is="head" data="{{title: 'view'}}" />

  <view class="page-body">
  </view>

  <template is="foot" />
</view>
    `

const headXml = `
<import src="./foot.wxml"/>
<template name="head">
  <template is="foot" />
  <view class="page-head">
    <view class="page-head-title">{{title}}</view>
    <view class="page-head-line"></view>
    <view wx:if="{{desc}}" class="page-head-desc">{{desc}}</view>
  </view>
</template>
`
const footXml = `
<template name="foot">
  <navigator class="page-foot" openType="switchTab" url="/page/component/index" hover-class="none">
    <image class="icon-foot" src="../../../../image/icon_foot.png"></image>
  </navigator>
</template>
`

const include1Xml = `
  <navigator class="page-foot" openType="switchTab" url="/page/component/index" hover-class="none">
    <include src="include2.wxml"/>
    <image class="icon-foot" src="../../../../image/icon_foot.png"></image>
  </navigator>
`

const include2Xml = `
<view></view>
<view></view>
`

describe('template', () => {

  it('parse `wxml`', () => {
    const pagePath = path.join(__dirname, '../../../../../demo/weapp/input/page/component/pages/view/view.wxml')
    const options = {
      ext: {
        wxml: '.nml',
        wxss: '.nss',
        app: '.njs'
      },
      input: path.join(__dirname, '../../../../../demo/weapp/input'),
      output: path.join(__dirname, '../../../../../demo/weapp/output/src')
    }

    const ret = rewrite(viewXml, pagePath, options, fs)

    //console.log(ret)
    const {
      logs,
      imports,
      nodes,
      wxs,
      deps
    } = ret
    //entry wxs
    expect(wxs.length).eql(3)
    expect(wxs[0].src).eql('../../../common/m3.wxs')

    //entry imports
    expect(imports.length).eql(1)
    expect(imports[0].attributes.name).eql('import-head')

    //entry nodes
    expect(nodes.length).eql(2)
    expect(nodes[0].attributes['class']).eql('u-w-navigator page-foot')

    expect(deps.length).eql(3)

    const footRet = deps[0]
    expect(footRet.imports.length).eql(0)
    expect(footRet.nodes.length).eql(1)
    expect(footRet.nodes[0].attributes['class']).eql('u-w-navigator page-foot')

    const headRet = deps[1]
    expect(headRet.imports.length).eql(1)
    expect(headRet.imports[0].attributes.name).eql('import-foot')
    expect(headRet.nodes.length).eql(2)
    expect(headRet.nodes[0].name).eql('import-foot')

    const viewMsgItemRet = deps[2]
    expect(viewMsgItemRet.imports.length).eql(0)
    expect(viewMsgItemRet.nodes.length).eql(1)
    expect(viewMsgItemRet.nodes[0].name).eql('div')
  })

})