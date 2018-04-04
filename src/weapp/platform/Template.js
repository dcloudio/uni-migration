import Base from './Base'

export default function Template (options, {
  module,
  exports,
  /*eslint-disable camelcase*/
  $app_require$
}) {
  Base(options, {
    type: 'Template',
    module,
    exports,
    $app_require$
  })

  if (exports.default) {
    exports.default = options
  } else if (module.exports) {
    module.exports = options
  }
}
