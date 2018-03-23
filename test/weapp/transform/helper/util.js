const path = require('path')
const fs = require('fs-extra')
const chai = require('chai')
const expect = chai.expect
const css = require('css')

const LOG = require('../../../../lib/utils')

const options = require('../../../../lib/weapp/config')['uniapp']

const template = require('../../../../lib/weapp/transform/page-rewriter/template-rewriter').default
const serialize = require('../../../../lib/weapp/transform/page-rewriter/serialize').default

const style = require('../../../../lib/weapp/transform/page-rewriter/style-rewriter').default

const logError = logs => {
  let hasError = false
  logs && logs.length && logs.forEach(log => {
    if (log.reason.indexOf('W:') === 0) {
      //LOG.warn(log.reason.replace('W:', '') + '\t\n@' + log.line + ':' + log.column)
    } else if (log.reason.indexOf('I:') === 0) {
      //LOG.ignore(log.reason.replace('I:', '') + '\t\n@' + log.line + ':' + log.column)
    } else if (log.reason.indexOf('E:') === 0) {
      hasError = true
      LOG.error(log.reason.replace('E:', '') + '\t\n@' + log.line + ':' + log.column)
    } else {
      console.log(log.reason + '\t\n@' + log.line + ':' + log.column)
    }
  })
  return false
}
const pagePath = path.join(__dirname)
const config = {
  ext: {
    wxml: '.nml',
    wxss: '.nss',
    app: '.njs'
  },
  input: path.join(__dirname, '../../../../../demo/weapp/input'),
  output: path.join(__dirname, '../../../../../demo/weapp/output/src')
}
module.exports = {
  rewriteTemplate(code) {
    let templateCode = ''
    const templateRet = template(code, pagePath, config, fs)
    if (logError(templateRet.logs)) {
      return false
    }
    if (templateRet.nodes) {
      templateCode = serialize(templateRet.nodes,false)
    } else {
      logError([{
        reason: 'E:模板转换失败',
        line: 1,
        column: 1
      }])
      return false
    }
    return {
      code: templateCode,
      ast: templateRet.result || {}
    }
  },
  assertTemplateString(fixture, expected) {
    const ret = this.rewriteTemplate(fixture)
    expect(ret.code).eql(expected)
  },
  rewriteStyle(code) {
    let styleCode = ''
    const styleRet = style(code, options)
    if (logError(styleRet.logs)) {
      return false
    }
    if (styleRet.result) {
      styleCode = css.stringify(styleRet.result, {
        compress: true
      })
    } else {
      logError([{
        reason: 'E:样式转换失败',
        line: 1,
        column: 1
      }])
      return false
    }
    return {
      code: styleCode,
      ast: styleRet.result || {}
    }
  },
  assertStyleString(fixture, expected) {
    const ret = this.rewriteStyle(fixture)
    expect(ret.code).eql(expected)
  }
}