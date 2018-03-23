import Base from './Base'

export default function Page (options, {
  wxs,
  path,
  module,
  exports,
  /*eslint-disable camelcase*/
  $app_require$
}) {
  Base(options, {
    wxs,
    type: 'Page',
    path,
    module,
    exports,
    /*eslint-disable camelcase*/
    $app_require$
  })
  if (exports.default) {
    exports.default = options
  } else if (module.exports) {
    module.exports = options
  }
}
