const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用router接口
 */
polyfill(__dirname, {
  push({
    uri
  }) {},
  replace({
    uri
  }) {},
  back() {}
})

describe('api.router', () => {

  it('wx.navigateTo', () => {
    wx.navigateTo({
      url: 'detail',
      success: () => {},
      fail: () => {}
    });
  })

  it('wx.redirectTo', () => {
    wx.redirectTo({
      url: 'search',
      success: () => {},
      complete: () => {}
    });
  })

  it('wx.navigateBack', () => {
    wx.navigateBack({
      delta: 1
    });
  })

})