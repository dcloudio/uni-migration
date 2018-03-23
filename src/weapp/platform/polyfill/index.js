/*eslint-disable camelcase,no-undef*/
const app = $app_require$('@app-module/system.app')

export * from './refresh'
export * from './storage'
export * from './navigationbar'

export async function getSystemInfoSync () {
  return new Promise((resolve, reject) => {
    app.getInfo({
      success (data) {
        resolve({
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
        })
      }
    })
  })
}
