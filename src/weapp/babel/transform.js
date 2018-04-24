import { transform } from 'babel-core'

import plugins from './index'

export default function transformCode (code, options) {
  return transform(code, {
    ast: false,
    babelrc: {
      presets: false
    },
    plugins: [
      ['babel-plugin-transform-class-properties'],
      ['babel-plugin-transform-object-rest-spread'],
      [plugins, options]
    ]
  })
}
