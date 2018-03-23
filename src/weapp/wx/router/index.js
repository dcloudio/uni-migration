export default {
  navigateTo: {
    name: 'push',
    args (params) {
      return {
        uri: params.url
      }
      // 无success，fail，complete等回调函数。
    }
  },
  redirectTo: {
    name: 'replace',
    args (params) {
      return {
        uri: params.url
      }
      // 无success，fail，complete等回调函数。
    }
  },
  navigateBack: {
    name: 'back'
    // 无可传的参数
  },
  switchTab: {
    name: 'replace'
  }
  // 无reLaunch方法。
}
