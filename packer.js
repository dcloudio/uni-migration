const vm = require('vm')
const path = require('path')
const fs = require('fs-extra')

//生成 ./lib/weapp/transform/helper/style/uniapp.css
const cssCodes = [fs.readFileSync(path.join(__dirname, './src/weapp/transform/helper/style/uniapp.css'), 'utf-8')]
const cssRoot = './src/weapp/transform/helper/tag'

  !(function parse(dir) {
    dir = dir || '.'
    const dirPath = path.join(__dirname, dir)
    fs.readdirSync(dirPath).forEach(file => {
      const filePath = path.join(dirPath, file)
      if (fs.statSync(filePath).isFile()) {
        if (path.extname(filePath) === '.css') {
          cssCodes.push(fs.readFileSync(filePath, 'utf-8'))
        }
      } else {
        parse(path.join(dir, file))
      }
    })
  })(cssRoot)

fs.outputFileSync(path.join(__dirname, './lib/weapp/transform/helper/style/uniapp.css'), cssCodes.join('\r\n'), {
  override: true
})

const modules = []
const wxRoot = './src/weapp/wx'
fs.readdirSync(path.join(__dirname, wxRoot)).forEach(name => {
  const dir = path.join(wxRoot, name)
  if (fs.statSync(dir).isDirectory() && fs.existsSync(path.join(dir, 'index.js'))) {
    modules.push(path.basename(dir))
  }
})
//生成wx/packer.js
const importCode = modules.map(name => `import ${name} from './${name}/index.js'`).join('\r\n')
const exportCode = modules.map(name => `  ${name}`).join(',\r\n')
const packerCode = `${importCode}

export default {
${exportCode}
}
`
fs.outputFileSync(path.join(wxRoot, 'packer.js'), packerCode, {
  override: true
})

const events = []
const evtRoot = './src/weapp/transform/helper/event'
fs.readdirSync(path.join(__dirname, evtRoot)).forEach(name => {
  const dir = path.join(evtRoot, name)
  if (fs.statSync(dir).isDirectory() && fs.existsSync(path.join(dir, 'index.js'))) {
    events.push(path.basename(dir))
  }
})
//生成weapp/transform/helper/event/packer.js

const importEvtCode = events.map(name => `import ${name==='switch'?'switchEvent':name} from './${name}/index.js'`).join('\r\n')
const exportEvtCode = events.map(name => `  ${name==='switch'?('\'switch\':switchEvent'):name}`).join(',\r\n')
const packerEvtCode = `${importEvtCode}

export default {
${exportEvtCode}
}
`
fs.outputFileSync(path.join(evtRoot, 'packer.js'), packerEvtCode, {
  override: true
})

//生成babel/wx.js
const wx = {}
const context = vm.createContext({
  module: {
    exports: {}
  }
})
modules.forEach(module => {
  const code = fs.readFileSync(path.join(__dirname, `./src/weapp/wx/${module}/index.js`), 'utf-8').replace('export default', 'module.exports=')
  const moduleDef = vm.runInContext(code, context)
  Object.keys(moduleDef).forEach(name => {
    wx[name] = {
      module,
      method: moduleDef[name].name
    }
  })
})
const wxCode = `export default ${JSON.stringify(wx)}`
fs.outputFileSync(path.join(__dirname, './src/weapp/babel', 'wx.js'), wxCode, {
  override: true
})