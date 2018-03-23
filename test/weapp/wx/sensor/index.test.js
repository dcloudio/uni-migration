const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用sensor接口
 */
polyfill(__dirname, {
	subscribeCompass({
		callback
	}) {
		callback({
			direction:132
		})
	},
	unsubscribeCompass(){},
	subscribeAccelerometer({
		callback
	}) {
		callback({
			x:1,
			y:2,
			z:3
		})
	},
	unsubscribeAccelerometer(){}
})

describe('api.sensor', () => {

	it('wx.onCompassChange', () => {
		wx.onCompassChange(function(res) {
			expect(res.direction).eql(132)
		})
	})
	
	it('wx.stopCompass', () => {
		wx.stopCompass({
			success:function(ret){
				console.log(ret);
			}
		})
	})
	it('wx.onAccelerometerChange', () => {
		wx.onAccelerometerChange(function(res) {
			expect(res.x).eql(1)
		})
	})
	
	it('wx.stopAccelerometer', () => {
		wx.stopAccelerometer({
			success:function(ret){
				console.log(ret);
			}
		})
	})

})