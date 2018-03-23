const chai = require('chai')
const expect = chai.expect

require('../util')

const errCode = 404

polyfill(__dirname, {
    getLocation({
		data,
        success,
        fail,
        complete
    }) {
		if(data === 'fail'){
			fail('获取失败', errCode)
		}else{
			success({latitude:'39.969137',longitude:'116.347384'})
			complete({latitude:'39.969137',longitude:'116.347384'})
		}
	}
})

describe('api.geolocation', () => {
    it('wx.getLocation', () => {
        wx.getLocation({
            success: function (res) {
                expect(res.latitude).eql('39.969137')
            },
			complete:function (res) {
				expect(res.longitude).eql('116.347384')
			}
        })
		 wx.getLocation({
			data:'fail',
            fail: function (data, code) {
                expect(code).eql(errCode)
            }
        })
    })
})
