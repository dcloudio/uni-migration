const createArgsCallExpression = (t, arg, {
  state,
  wxMethod
}) => {
  const objectExpression = t.objectExpression([
    t.objectProperty(t.identifier('page'), t.stringLiteral(state.opts.page || '')),
    t.objectProperty(t.identifier('method'), t.stringLiteral(wxMethod))
  ])
  return t.callExpression(t.identifier('_$$parseArgs$$_'), [arg, objectExpression])
}

export default function (t, args, {
  type,
  state,
  module,
  method,
  wxMethod
}) {
  let callee
  if (type === 'custom') {
    callee = t.memberExpression(t.identifier('_$$' + module + '$$_'), t.identifier(wxMethod))
  } else {
    if (~wxMethod.indexOf('Sync')) {
      callee = t.memberExpression(t.identifier('_$$' + module + '$$_'), t.identifier(wxMethod))
    } else {
      const identifier = `_$${module}$_`
      if (!state.imports) {
        state.imports = {}
      }
      state.imports[identifier] = '@system.' + module

      callee = t.memberExpression(t.identifier(identifier), t.identifier(method))
    }
    if (!~wxMethod.indexOf('Sync') && args && args.length === 1) {
      args = [createArgsCallExpression(t, args[0], {
        state,
        wxMethod
      })]
    }
  }
  return t.callExpression(callee, args)
}
