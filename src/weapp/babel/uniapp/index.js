const createArgsCallExpression = (t, arg, {
  state,
  wxMethod
}) => {
  const objectExpression = t.objectExpression([
    t.objectProperty(t.identifier('page'), t.stringLiteral(state.opts.page || '')),
    t.objectProperty(t.identifier('method'), t.stringLiteral(wxMethod))
  ])
  return t.callExpression(t.memberExpression(t.identifier('uni'), t.identifier('parseArgs')), [arg, objectExpression])
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
    callee = t.memberExpression(t.identifier('uni'), t.identifier(wxMethod))
  } else {
    callee = t.memberExpression(t.memberExpression(t.identifier('uni'), t.identifier(module)), t.identifier(method))
    if (!~wxMethod.indexOf('Sync') && args && args.length === 1) {
      args = [createArgsCallExpression(t, args[0], {
        state,
        wxMethod
      })]
    }
  }
  return t.callExpression(callee, args)
}
