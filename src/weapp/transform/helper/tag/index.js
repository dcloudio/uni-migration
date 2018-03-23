import path from 'path'
import fs from 'fs-extra'

import { initEvents } from '../event'

const tags = {}

!(function parse (dir) {
  dir = dir || '.'
  const dirPath = path.join(__dirname, dir)
  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isFile()) {
      if (path.extname(filePath) === '.js') {
        const tagName = path.basename(path.dirname(filePath))
        if (tagName !== 'tag') {
          const component = require(filePath)['default']
          if (component.event) {
            component.event = initEvents(component.event)
          }
          tags[tagName] = component
        }
      }
    } else {
      parse(path.join(dir, file))
    }
  })
})('.')

export default tags
