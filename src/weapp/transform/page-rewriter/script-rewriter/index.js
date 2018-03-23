import { transform } from 'babel-core'

import plugins from '../../../babel'

export default function rewriter (code, pagePath, options) {
  const ret = transform(code, {
    ast: false,
    babelrc: false,
    plugins: [
      [plugins, {
        page: pagePath,
        target: options.target
      }]
    ]
  })
  return {
    logs: [],
    result: ret.code
  }
}
