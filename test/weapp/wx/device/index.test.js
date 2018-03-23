const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用storage接口
 */
const data = {} //临时存储

const errCode = 404

polyfill(__dirname, {
    getInfo({
        data,
        success,
        fail,
        complete
    }) {
        if (data === 'fail') {
            fail('获取失败', errCode)
        } else {
            success({brand:'OPPO',model:'oppo r9s',pixelRatio:2,platformVersionName:'andriod'})
            complete({brand:'OPPO',model:'oppo r9s',pixelRatio:2,platformVersionName:'andriod'})
        }
    }
})

describe('api.device', () => {
    it('wx.getSystemInfo', () => {
        wx.getSystemInfo({
            success: function (data) {
                expect(data.platform).eql('andriod')
            },
            complete: function (data) {
                expect(data.platform).eql('andriod')
            }
        })
        wx.getSystemInfo({
            data: 'fail',
            fail: function (data, code) {
                expect(code).eql(errCode)
            }
        })
    })
})
