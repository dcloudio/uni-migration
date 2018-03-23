const getSystemInfo = {
  name: 'getInfo',
  returnValue (data) {
    // uniapp没有pixelRatio、windowWidth、windowHeight、statusBarHeight、language、version、fontSizeSetting、SDKVersion
    return {
      'brand': data.brand,
      'model': data.model,
      'screenWidth': data.screenWidth,
      'screenHeight': data.screenHeight,
      'system': data.osVersionCode,
      'platform': data.platformVersionName,
      'pixelRatio': '',
      'windowWidth': '',
      'windowHeight': '',
      'statusBarHeight': '',
      'language': '',
      'version': '',
      'fontSizeSetting': '',
      'SDKVersion': ''
    }
  }
}

export default {
  getSystemInfo
}
