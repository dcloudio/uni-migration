const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用media接口
 */
const errCode = 404;
polyfill(__dirname, {
  pickImage({
    success,
    fail,
    complete
  }) {
    success({
      uri: '../images/test.jpg'
    })
    complete({
      uri: '../images/test.jpg'
    })
  },
  pickVideo({
    success,
    fail,
    complete
  }) {
    success({
      uri: '../videos/test.mp4'
    })
    complete({
      uri: '../videos/test.mp4'
    })
  }
})

describe('api.media', () => {

  it('wx.chooseImage', () => {
    wx.chooseImage({
      success: data => {
        expect(data.tempFilePaths[0]).eql('../images/test.jpg')
      },
      complete: data => {
        expect(data.tempFilePaths[0]).eql('../images/test.jpg')
      }
    })
  })

  it('wx.chooseVideo', () => {
    wx.chooseVideo({
      success: data => {
        expect(data.tempFilePath).eql('../videos/test.mp4')
        //      expect(data.errMsg).eql('chooseVideo:ok')
      },
      complete: data => {
        expect(data.tempFilePath).eql('../videos/test.mp4')
        //      expect(data.errMsg).eql('chooseVideo:ok')
      }
    })
  })

})