import transform from '../../../babel/transform'

export default function rewriter (code, pagePath, options) {
  const ret = transform(code, {
    page: pagePath,
    target: options.target
  })
  return {
    logs: [],
    result: ret.code
  }
}
