const log = (type, msg) => type + ': ' + '组件`COMPONENT`不支持`NAME`属性配置' + (msg ? (',' + msg) : '')

export const warn = msg => log('WARN', msg)
export const error = msg => log('ERROR', msg)
export const defaultWarn = warn()
export const defaultError = error()
