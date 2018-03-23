const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用storage接口
 */
const data = {} //临时存储

const errCode = 404

polyfill(__dirname, {
    set({
        text,
        success,
        fail,
        complete
    }) {
        if (text === 'fail') {
            fail('剪切失败', errCode)
        } else {
            success(text)
            complete(text)
        }
    },
    get({
        data,
        success,
        fail,
        complete
    }) {
        if (data === 'fail') {
            fail('剪切失败', errCode)
        } else {
            success({
                text: 'value'
            })
            complete({
                text: 'value'
            })
        }
    }
})

describe('api.clipboard', () => {

    it('wx.setClipboardData', () => {
        wx.setClipboardData({
            data: 'value',
            success: function (data) {
                expect(data).eql('value')
            },
            complete: function (data) {
                expect(data).eql('value')
            }
        })
        wx.setClipboardData({
            data: 'fail',
            fail: function (data, code) {
                expect(code).eql(errCode)
            }
        })
    })

    it('wx.getClipboardData', () => {
        wx.getClipboardData({
            success: function (res) {
                expect(res.data).eql('value')
            },
            complete: function (res) {
                expect(res.data).eql('value')
            }
        })
        wx.getClipboardData({
            data: 'fail',
            fail: function (data, code) {
                expect(code).eql(errCode)
            }
        })
    })

})
