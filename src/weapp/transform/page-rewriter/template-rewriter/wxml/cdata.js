export default function rewrite (code) {
  // 为<wxs>内容增加<![CDATA[]]>
  return code.replace(/\<wxs.[^<>]*\>/g, function (match) {
    return `${match}<![CDATA[`
  }).replace(/\<\/wxs\>/g, function (match) {
    return `]]>${match}`
  })
}
