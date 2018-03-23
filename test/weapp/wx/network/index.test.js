const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用network接口
 */
const errCode = 404;
polyfill(__dirname, {
  getType({
    success,
    fail,
    complete
  }) {
    success({
      type: 'wifi'
    })
    complete({
      type: 'wifi'
    })
  },
  subscribe({
    callback
  }) {
    callback({
      type: 'wifi'
    })
  }
})

describe('api.network', () => {

  it('wx.getNetworkType', () => {
    wx.getNetworkType({
      success: data => {
        expect(data.networkType).eql('wifi')
      },
      complete: data => {
        expect(data.networkType).eql('wifi')
      }
    })
  })

  it('wx.onNetworkStatusChange', () => {
    wx.onNetworkStatusChange(data => {
      expect(data.networkType).eql('wifi')
    })
  })
})