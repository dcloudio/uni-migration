import path from 'path'
import fs from 'fs-extra'
import { pd as beautify } from 'pretty-data'

import rewriteRoot from '../root'
import serialize from '../serialize'

import {
  relativePath,
  normalizePath
} from '../../../../utils'

export default function rewriter (pagePath, nodes, options) {
  if (!fs.existsSync(pagePath)) {
    const templateCode = beautify.xml(rewriteRoot(serialize(nodes)))
    const folder = path.join(pagePath, '..')
    const files = ['polyfill' + options.ext.wxss, 'app' + options.ext.wxss]
    const importCode = files.map(file => {
      return `@import '${normalizePath(relativePath(folder, path.join(options.output, file)))}';`
    }).join('\r\n')
    return `<template>
${templateCode}
</template>
<style>
${importCode}
</style>
<script>
  export default {
    props: ['data'],
    onInit() {
      
      this.$handleRouterEvent = _$$handleRouterEvent$$_($app_require$)
      
      this.data&&Object.keys(this.data).forEach(key => this.$set(key, this.data[key]))
    }
  }
</script>
  `
  }
}
