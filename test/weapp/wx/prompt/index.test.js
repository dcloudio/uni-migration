const chai = require('chai')
const expect = chai.expect

require('../util')

/**
 * 模拟快应用prompt接口
 */

polyfill(__dirname, {
	showToast({
		message,
		duration
	}) {
		expect(message).eql('成功');
		expect(duration).eql(0);
	},
	showDialog({
		title,
		message,
		buttons,
		success,
		cancel,
		complete
	}) {
		if(title == "确定") {
			success({
				index: 0
			})
		}
		if(title == "取消") {
			success({
				index: 1
			})
		}
	},
	showContextMenu({
		itemList,
		itemColor,
		success,
		cancel,
		complete
	}) {
		success({
			index: 0
		})
		complete({
			index: 0
		})
	}
})

describe('api.prompt', () => {
	it("wx.showToast", () => {
		wx.showToast({
			title: '成功',
			icon: 'success',
			duration: 2000
		});
	})

	it("wx.showModal", () => {
		wx.showModal({
			title: '确定',
			content: '这是一个模态弹窗',
			success: function(res) {
				expect(res.confirm).eql(true)
				expect(res.cancel).eql(false)
			}
		});
		wx.showModal({
			title: "弹窗标题",
			content: "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
			showCancel: false,
			confirmText: "确定"
		});
		wx.showModal({
			title: "取消",
			content: "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
			showCancel: false,
			confirmText: "确定",
			success: function(res) {
				expect(res.confirm).eql(false)
				expect(res.cancel).eql(true)
			}
		});
		wx.showModal({
			content: "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
			confirmText: "确定1",
			cancelText: "取消2",
			cancelColor: "#FFF000"
		})
	})
	it("wx.showActionSheet", () => {
		wx.showActionSheet({
			itemList: ['A', 'B', 'C'],
			success: function(res) {
				expect(res.tapIndex).eql(0)
			},
			complete: function(res) {
				expect(res.tapIndex).eql(0)
			},
			fail: function(res) {
				console.log(res)
			}
		})
	})
})