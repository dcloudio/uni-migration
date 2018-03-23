export default {
  // 暂不支持wx.showLoading(),wx.hideLoading(),wx.hideToast();
  showToast: { // 无icon，image，mask等参数
    name: 'showToast',
    args (params) {
      return {
        message: params.title,
        duration: params.duration > 2000 ? 1 : 0
      }
    }
  },
  showModal: {
    name: 'showDialog',
    args (params) {
      const result = {
        title: params.title,
        message: params.content,
        buttons: [{
          text: '确定',
          color: ''
        }, {
          text: '取消',
          color: ''
        }]
      }
      if (!params.title) {
        delete result.title
      }
      if (!params.content) {
        delete params.content
      }
      if (!params.showCancel && typeof params.showCancel === 'boolean') {
        result.buttons.pop()
      }
      if (result.buttons[1] && params.cancelText) {
        result.buttons[1].text = params.cancelText
      }
      if (result.buttons[1] && params.cancelColor) {
        result.buttons[1].color = params.cancelColor
      }
      if (params.confirmText) {
        result.buttons[0].text = params.confirmText
      }
      if (params.confirmColor) {
        result.buttons[0].color = params.confirmColor
      }
      return result
    },
    returnValue (data) {
      if (data.index === 0) {
        return {
          confirm: true,
          cancel: false
        }
      } else {
        return {
          confirm: false,
          cancel: true
        }
      }
    }
  },
  showActionSheet: {
    name: 'showContextMenu',
    returnValue (data) {
      return {
        tapIndex: data.index
      }
    }
  }
}
