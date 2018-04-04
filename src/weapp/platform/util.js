const serviceModules = ['push', 'pay', 'wxpay', 'alipay', 'appshare']

export const fixedModuleName = function (module) {
  if (~serviceModules.indexOf(module)) {
    return '@app-module/service.' + module
  }
  return '@app-module/system.' + module
}
