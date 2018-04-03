const path = require('path')
const fs = require('fs-extra')
const chai = require('chai')
const expect = chai.expect

const babel = require('babel-core')

const plugins = require('../../../../lib/weapp/babel').default

describe('babel.quickapp', () => {

  it('transform `Page`', () => {
    const fixture = `Page({
onReady () {
    const value = wx.getStorageSync('key')
    console.log(value)
},
onShow(){
    wx.request({
      url: 'test.php' //仅为示例，并非真实的接口地址
    })
    wx['request']({
      url: 'test.php' //仅为示例，并非真实的接口地址
    })
}
})`

    const expected = `import _$fetch$_ from '@system.fetch';
Page({
    async onReady() {
        const value = await _$$polyfill$$_.getStorageSync('key');
        console.log(value);
    },
    onShow() {
        _$fetch$_.fetch(_$$parseArgs$$_({
            url: 'test.php' //仅为示例，并非真实的接口地址
        }, {
            page: 'pages/page',
            method: 'request'
        }));
        _$fetch$_.fetch(_$$parseArgs$$_({
            url: 'test.php' //仅为示例，并非真实的接口地址
        }, {
            page: 'pages/page',
            method: 'request'
        }));
    }
}, {
    path: 'pages/page',
    module: module,
    exports: exports,
    $app_require$: $app_require$,
    wxs: typeof _$wxs$_ === 'undefined' ? {} : _$wxs$_
});`

    const ret = babel.transform(fixture, {
      plugins: [
        [plugins, {
          page: 'pages/page',
          target: 'quickapp'
        }]
      ]
    })
    expect(ret.code).eql(expected)

  })

})