const fs = require('fs-extra')
const chai = require('chai')
const expect = chai.expect

const rewriter = require(__dirname.replace('test', 'lib')).default

describe('style.selector', () => {

  it('rewrite `selector`', () => {
    expect(rewriter('view')).eql('.u-w-view')
    expect(rewriter('.view')).eql('.view')
    expect(rewriter('#view')).eql('#view')
  })

})