import packer from '../wx/packer'

const modules = {}
Object.keys(packer).forEach(moduleName => {
  const moduleDef = packer[moduleName]
  Object.keys(moduleDef).forEach(methodName => {
    const methodDef = moduleDef[methodName]
    methodDef['module'] = moduleName
    modules[methodName] = methodDef
  })
})

export default modules
