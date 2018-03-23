const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用storage接口
 */
const data = {} //临时存储

const errCode = 404

polyfill(__dirname, {
    setValue({
		text,//测试使用
        value,
        success,
        fail,
        complete
    }) {
        if (text === 'fail') {
            fail('设置失败', errCode)
        } else {
            success()
            complete()
        }
    },
    getValue({
		text,//测试使用
        success,
        fail,
        complete
    }) {
        if (text === 'fail') {
            fail('获取失败', errCode)
        } else {
            success({value:255})
            complete({value:255})
        }
    }
})

describe('api.brightness', () => {

    it('wx.setScreenBrightness', () => {
        wx.setScreenBrightness({
            value: 1,
            success: function (data) {
				
            },
            complete: function (data) {
				
            }
        })
        wx.setScreenBrightness({
            text: 'fail',
            fail: function (data, code) {
                expect(code).eql(errCode)
            }
        })
    })

    it('wx.getScreenBrightness', () => {
        wx.getScreenBrightness({
            success: function (res) {
                expect(res.value).eql('1')
            },
            complete: function (res) {
				
            }
        })
        wx.getScreenBrightness({
            text: 'fail',
            fail: function (data, code) {
                expect(code).eql(errCode)
            }
        })
    })

})
