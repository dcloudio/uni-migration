export default {
  getNetworkType: {
    name: 'getType',
    returnValue (data) {
      return {
        networkType: data.type
      }
    }
  },
  onNetworkStatusChange: {
    name: 'subscribe',
    args (callback) {
      return {
        callback: callback
      }
    },
    returnValue (data) {
      // returnValue没有isConnected参数。
      return {
        networkType: data.type
      }
    }
  }
}
