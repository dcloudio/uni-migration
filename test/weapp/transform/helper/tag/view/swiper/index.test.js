const rewriter = require('../../../util')

describe('template.tag.swiper', () => {

  it('rewrite `swiper`', () => {
    const fixture = `
<swiper indicator-dots="{{indicatorDots}}" indicator-color="#ffffff" indicator-active-color="#000000"
        autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" bindchange="changeHandler">
</swiper>
`

    const expected = `<swiper class="u-w-swiper" indicator="{{indicatorDots}}" style="indicator-color:#ffffff;indicator-selected-color:#000000" autoplay="{{autoplay}}" interval="{{interval}}" onchange="$handlePageEvent('changeHandler',false,false)"></swiper>`

    rewriter.assertTemplateString(fixture, expected)
  })

})