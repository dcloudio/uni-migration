import uglify from 'rollup-plugin-uglify'
export default [{
  input: 'src/weapp/platform/uniapp/index.js',
  output: {
    file: 'lib/weapp/platform/uniapp/index.js',
    format: 'iife'
  },
  plugins: [uglify()]
}, {
  input: 'src/weapp/platform/quickapp/index.js',
  output: {
    file: 'lib/weapp/platform/quickapp/index.js',
    format: 'iife'
  },
  plugins: [uglify()]
}, {
  input: 'src/weapp/wx/index.js',
  output: {
    file: 'test/weapp/wx/wx.js',
    format: 'iife'
  }
}]