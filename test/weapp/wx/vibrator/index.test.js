const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用vibrator接口
 */
polyfill(__dirname, {
  vibrate() {}
})

describe('api.vibrator', () => {

  it('wx.vibrateLong', () => {
    wx.vibrateLong()
  })

  it('wx.vibrateShort', () => {
    wx.vibrateShort()
  })
})