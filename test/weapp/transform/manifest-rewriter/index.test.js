const path = require('path')
const fs = require('fs-extra')
const chai = require('chai')
const expect = chai.expect

const rewriter = require(__dirname.replace('test', 'lib')).default

describe('manifest', () => {

  it('rewrite `window`', () => {
    const inputPath = path.join(__dirname, '../../../../demo/weapp/input')
    const appJson = require('./app.json')
    appJson.page = {}
    const {
      manifest,
      components
    } = rewriter(appJson, inputPath)
    expect(manifest.display.backgroundColor).eql(appJson.window.backgroundColor)
    expect(manifest.display.titleBarBackgroundColor).eql(appJson.window.navigationBarBackgroundColor)
    expect(manifest.display.titleBarText).eql(appJson.window.navigationBarTitleText)
    console.log(components)
  })

})