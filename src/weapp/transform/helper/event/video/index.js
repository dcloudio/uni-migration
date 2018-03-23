export default {
  timeupdate: { // 快应用事件名
    detail: function (evt) { // 转换detail
      return {
        currentTime: evt.currenttime,
        duration: ''
      }
    }
  },
  fullscreenchange: {
    detail: function (evt) { // 转换detail
      return {
        fullScreen: evt.fullscreen,
        direction: 'horizontal'
      }
    }
  }
}
