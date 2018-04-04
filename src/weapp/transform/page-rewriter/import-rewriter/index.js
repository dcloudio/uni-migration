import path from 'path'
import fs from 'fs-extra'
import { pd as beautify } from 'pretty-data'

import rewriteRoot from '../root'
import serialize from '../serialize'
import generateImportCode from '../import'

import {
  relativePath,
  normalizePath
} from '../../../../utils'

export default function rewriter (pagePath, nodes, imports, styleCode, options) {
  if (!fs.existsSync(pagePath)) {
    const importTemplateCode = generateImportCode(imports, options)
    const templateCode = beautify.xml(rewriteRoot(serialize(nodes), true))
    const folder = path.join(pagePath, '..')
    const files = ['polyfill' + options.ext.wxss, 'app' + options.ext.wxss]
    const importCode = files.map(file => {
      return `@import '${normalizePath(relativePath(folder, path.join(options.output, file)))}';`
    }).join('\r\n')

    return `${importTemplateCode}
<template>
${templateCode}
</template>
<style>
${importCode}
${styleCode}
</style>
<script>
  Template({
    props: ['data'],
    onInit() {
      this.setPropsData(this.data)
      this.$watch('data','handlePropsData')
    },
    setPropsData(data){
      data&&Object.keys(data).forEach(key => this.$set(key, data[key]))
    },
    handlePropsData(newVal,oldVal){
      this.setPropsData(newVal)
    }
  },{
    module: module,
    exports: exports,
    $app_require$: $app_require$
  })
</script>
  `
  }
}
