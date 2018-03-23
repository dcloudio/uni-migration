export default {
  change: { // 快应用事件名
    detail: function (evt) { // 转换detail
      switch (evt.target.attr.type) {
        case 'time':
          evt.minute = evt.minute < 10 ? ('0' + evt.minute) : evt.minute
          evt.hour = evt.hour < 10 ? ('0' + evt.hour) : evt.hour
          return {
            value: evt.hour + ':' + evt.minute
          }
        case 'date':
          evt.month = evt.month < 10 ? ('0' + evt.month) : evt.month
          evt.day = evt.day < 10 ? ('0' + evt.day) : evt.day
          return {
            value: evt.year + '-' + evt.month + '-' + evt.day
          }
        case 'text':
          return {
            value: evt.newSelected
          }
        default:
          return {
            value: ''
          }
      }
    }
  }
}
