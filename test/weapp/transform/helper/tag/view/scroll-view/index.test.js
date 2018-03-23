const rewriter = require('../../../util')

describe('template.tag[scroll-view]', () => {

  it('rewrite `scroll-view`', () => {
    const fixture = `
    <scroll-view scroll-y="{{scrollY}}" upper-threshold="{{upperThreshold}}" lower-threshold="{{lowerThreshold}}"
     scroll-top="{{scrollTop}}" scroll-left="{{scrollLeft}}" scroll-into-view="{{scrollIntoView}}"
     scroll-with-animation="{{scrollWithAnimation}}" enable-back-to-top="{{enableBackToTop}}" bindscroll="scrollHandler" bindscrolltolower="scrollbottomHandler">
    <view><text>text</text></view>
    </scroll-view>
`

    const expected = `<list class="u-w-scroll-view" onscroll="$handlePageEvent('scrollHandler',false,false)" onscrollbottom="$handlePageEvent('scrollbottomHandler',false,false)"><list-item type="u-w-scroll-view-list-item" class="u-w-list-item"><div class="u-w-view"><text class="u-w-text">text</text></div></list-item></list>`

    rewriter.assertTemplateString(fixture, expected)
  })

})