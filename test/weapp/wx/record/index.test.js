const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用storage接口
 */
const data = {} //临时存储

const errCode = 404

polyfill(__dirname, {
    startRecord({
		text,
        success,
        fail,
        complete
    }) {
        if (text === 'fail') {
            fail('录音失败', errCode)
        } else {
            success({path:'/sdcard/record/test'})
            complete({path:'/sdcard/record/test'})
        }
    },
    stopRecord({
		
    }) {
        
    }
})

describe('api.record', () => {

    it('wx.startRecord', () => {
        wx.startRecord({
            success: function (res) {
				expect(res.tempFilePath).eql('/sdcard/record/test')
            },
            complete: function (res) {
				expect(res.tempFilePath).eql('/sdcard/record/test')
            }
        })
        wx.startRecord({
            text: 'fail',
            fail: function (data, code) {
                expect(code).eql(errCode)
            }
        })
    })

    it('wx.stopRecord', () => {
        wx.stopRecord()
    })

})
