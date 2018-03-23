const path = require('path')
const fs = require('fs-extra')
const chai = require('chai')
const expect = chai.expect

const babel = require('babel-core')

const plugins = require('../../../lib/weapp/babel').default

describe('babel.import', () => {

  it('transform `import|require`', () => {
    const fixture = `const a = require('a.js');
const b = require('./b.js');
import c from 'c.js';
import './c.js';`

    const expected = `const a = require('./a.js');
const b = require('./b.js');
import c from './c.js';
import './c.js';`

    const ret = babel.transform(fixture, {
      plugins: [
        [plugins, {
          page: 'pages/page',
          target: 'uniapp'
        }]
      ]
    })
    expect(ret.code).eql(expected)

  })

})