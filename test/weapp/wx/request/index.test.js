const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用request接口
 */
const errCode = 404;
polyfill(__dirname, {
  upload({
    url,
    header,
    method,
    files,
    success,
    fail,
    complete
  }) {
    success({
      code: 200,
      data: 'hello'
    })
    complete({
      code: 200,
      data: 'hello'
    })
  },
  download({
    url,
    header,
    success,
    fail,
    complete
  }) {
    success({
      token: 'token123'
    })
    complete({
      token: 'token123'
    })
  }
})

describe('api.request', () => {

  it('wx.uploadFile', () => {
    wx.uploadFile({
      url: 'http://www.test.com/upload',
      filePath: './files/file.txt',
      name: 'upload_file',
      header: {},
      success: data => {
        expect(data.statusCode).eql(200)
      },
      complete: data => {
        expect(data.statusCode).eql(200)
      }
    })
  })

  it('wx.downloadFile', () => {
    wx.downloadFile({
      url: 'http://www.test.com/upload',
      header: {},
      success: data => {
        expect(data.statusCode).eql('token123')
      },
      complete: data => {
        expect(data.statusCode).eql('token123')
      }
    })
  })

})