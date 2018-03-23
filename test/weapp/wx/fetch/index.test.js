const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用fetch接口
 */
const errCode = 404;
polyfill(__dirname, {
  fetch({
    url,
    data,
    header,
    method,
    success,
    fail,
    complete
  }) {
    success({
      code: 200,
      data: '{"name": "xiaoming"}',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    complete({
      code: 200,
      data: 'hello',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }
})

describe('api.fetch', () => {

  it('wx.request', () => {
    wx.request({
      url: 'http://www.test.com/fetch',
      data: 'test',
      header: {
        'Content-Type': 'text/plain'
      },
      method: 'GET',
      success: data => {
        expect(data.data.name).eql('xiaoming')
        expect(data.statusCode).eql(200)
        expect(data.header['Content-Type']).eql('text/plain')
      },
      complete: data => {
        expect(data.data).eql('hello')
        expect(data.statusCode).eql(200)
        expect(data.header['Content-Type']).eql('text/plain')
      }
    })
  })

})