export default {
  change: { // 快应用事件名
    detail: function (evt) { // 转换detail
      return {
        current: evt.index
      }
    }
  }
}
