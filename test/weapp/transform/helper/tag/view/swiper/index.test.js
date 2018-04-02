const rewriter = require('../../../util')

describe('template.tag.swiper', () => {

  it('rewrite `swiper`', () => {
    const fixture = `
<swiper indicator-color="#ffffff" indicator-active-color="#000000"
        autoplay="true" interval="{{interval}}" duration="{{duration}}" bindchange="changeHandler">
</swiper>
`

    const expected = `<swiper class="u-w-swiper" style="indicator-color:#ffffff;indicator-selected-color:#000000" autoplay="true" interval="{{interval}}" onchange="$handlePageEvent('changeHandler',false,false)" indicator="false"></swiper>`

    rewriter.assertTemplateString(fixture, expected)
  })

})