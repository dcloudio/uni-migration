import {
  error
} from './utils'

import migraters from './packer'

module.exports = function migrate (input, out, {
  target = 'quickapp',
  sign = false,
  stat = false
} = {}) {
  const migrater = migraters['weapp']
  if (migrater) {
    if (migrater.validate(input)) {
      const options = migrater.config[target]
      options.sign = !!sign
      options.stat = !!stat
      options.target = target
      options.input = input
      options.output = out
      migrater.transform(input, out, options)
    }
  } else {
    error('目前仅支持weapp转换')
  }
}
