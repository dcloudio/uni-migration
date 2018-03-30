import path from 'path'
import fs from 'fs-extra'

import rewriteScript from '../page-rewriter/script-rewriter'

import { logError, normalizePath } from '../../../utils'

const ext = ['.wxml', '.wxss']
export default function rewriter (input, out, ignoreFiles, dir, options) {
  dir = dir || '.'
  const dirPath = path.join(input, dir)
  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file)
    const relativePath = normalizePath(path.join(dir, file))
    if (fs.statSync(filePath).isFile()) {
      if (!~ignoreFiles.indexOf(relativePath) && !~ext.indexOf(path.extname(filePath))) {
        if (path.extname(filePath) === '.wxs') {
          file = file.replace('.wxs', options.ext.wxs)
        }
        // js,njs
        if (~['.js', '.njs'].indexOf(path.extname(file))) {
          const scriptRet = rewriteScript(fs.readFileSync(filePath, 'utf-8'), '', options)
          logError(scriptRet.logs, filePath)
          if (scriptRet.result) {
            fs.outputFileSync(path.join(out, dir, file), scriptRet.result, {
              override: true
            })
          } else {
            logError([{
              reason: 'E:js转换失败',
              line: 1,
              column: 1
            }], filePath)
          }
        } else {
          fs.copySync(filePath, path.join(out, dir, file))
        }
      }
    } else {
      rewriter(input, out, ignoreFiles, relativePath, options)
    }
  })

  options.stat && fs.copySync(path.join(__dirname, '../../../dcloud_stat'), out)
  options.sign && fs.copySync(path.join(__dirname, '../../../sign'), path.join(out, 'sign'))
}
