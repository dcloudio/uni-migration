import transform from '../../babel/transform'

export default function rewriter (code, pagePath, options) {
  const ret = transform(code, {
    page: pagePath,
    target: options.target
  })

  const statCode = `/**
* DCloud统计服务类似于快应用里的友盟或阿拉丁，可登录 http://dev.dcloud.net.cn 查看统计数据
* 使用该服务可在一点看到所有渠道的运营数据，避免登陆不同渠道的后台，更方便的掌握业务运营状态。
* 如不需要此服务，请注释掉本行代码
*/
require('./dcloud_stat.js');`

  const appCode = `require('./polyfill.js');
${options.stat && statCode || ''}  
`
  if (options.target === 'uniapp') {
    return `${appCode}
${ret.code}
  `
  }
  return `
<script>
${appCode}
${ret.code}
</script>
  `
}
