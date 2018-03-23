export default {
  // 监听距离感应数据---小程序不支持
  // 监听光线感应数据---小程序不支持
  onCompassChange: {// 不支持wx.startCompass();
    name: 'subscribeCompass',
    args (callback) {
      return {
        callback: callback
      }
    }
  },
  stopCompass: {
    name: 'unsubscribeCompass'
  },
  onAccelerometerChange: {// 不支持wx.startAccelerometer();
    name: 'subscribeAccelerometer',
    args (callback) {
      return {
        callback: callback
      }
    }
  },
  stopAccelerometer: {
    name: 'unsubscribeAccelerometer'
  }
}
