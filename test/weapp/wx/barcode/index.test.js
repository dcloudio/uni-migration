const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用barcode接口
 */
const errCode = 404;
polyfill(__dirname, {
  scan({
    success,
    complete
  }) {
    success({
      result: 'hello'
    })
    complete({
      result: 'hello'
    })
  },
  scan({
    fail
  }) {
    if (false) {
      fail('调用失败', errCode)
    }
  }
})

describe('api.barcode', () => {

  it('wx.scanCode', () => {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: data => {
        expect(data.result).eql('hello')
      },
      complete: data => {
        expect(data.result).eql('hello')
      }
    })
  })

  it('wx.scanCode', () => {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      fail: (data, code) => {
        expect(code).eql(404)
      }
    })
  })
})