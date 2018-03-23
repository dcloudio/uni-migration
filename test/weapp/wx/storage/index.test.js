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
		key,
		value,
		success,
		fail,
		complete
	}) {
		if(key === 'fail') {
			fail('插入失败', errCode)
		} else {
			data[key] = value
			success(value)
			complete(value)
		}
	},
	get({
		key,
		success,
		fail,
		complete
	}) {
		if(key === 'fail') {
			fail('获取失败', errCode)
		} else {
			success(data[key])
			complete(data[key])
		}
	},
	delete({
		key,
		success,
		fail,
		complete
	}) {
		if(key === 'fail') {
			fail('删除失败', errCode)
		} else {
			success(data[key])
			complete(data[key])
		}
	},
	clear({
		success,
		fail,
		complete
	}) {}
})

describe('api.storage', () => {

	it('wx.setStorage', () => {
		wx.setStorage({
			key: 'key',
			data: 'value',
			success: function(data) {
				expect(data.errMsg).eql('setStorage:ok')
			},
			complete: function(data) {
				expect(data.errMsg).eql('setStorage:ok')
			}
		})
		wx.setStorage({
			key: 'fail',
			data: 'value',
			fail: function(data, code) {
				expect(code).eql(errCode)
			}
		})
	})

	it('wx.getStorage', () => {
		wx.getStorage({
			key: 'key',
			success: function(res) {
				expect(res.data).eql('value')
			},
			complete: function(res) {
				expect(res.data).eql('value')
			}
		})
		wx.getStorage({
			key: 'fail',
			fail: function(data, code) {
				expect(code).eql(errCode)
			}
		})
	})

	it('wx.removeStorage', () => {
		wx.removeStorage({
			key: 'key',
			success: function(data) {
				expect(data.errMsg).eql('removeStorage:ok')
			},
			complete: function(data) {
				expect(data.errMsg).eql('removeStorage:ok')
			}
		})
		wx.removeStorage({
			key: 'fail',
			fail: function(data, code) {
				expect(code).eql(errCode)
			}
		})
	})

	it('wx.clearStorage', () => {
		wx.clearStorage()
	})
})