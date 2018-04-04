import parseRouter from './router'
import { getCurrentPage } from './App'

export default function createHandleRouterEvent (/*eslint-disable camelcase*/ $app_require$, pagePath) {
  return function (openType, evt) {
    if (!pagePath) {
      const page = getCurrentPage()
      if (page) {
        pagePath = page._$path$_
      } else {
        pagePath = ''
      }
    }
    /*eslint-disable camelcase*/
    const router = $app_require$('@app-module/system.router')
    if (openType === 'navigateBack') {
      router.back()
    } else {
      const url = evt.target.attr && evt.target.attr.dataUrl
      if (url) {
        switch (openType) {
          case 'navigate':
            router.push(parseRouter(url, pagePath))
            break
          case 'redirect':
            router.replace(parseRouter(url, pagePath))
            break
          case 'switchTab':
            router.replace(parseRouter(url))
            router.clear()
            break
        }
      }
    }
  }
}
