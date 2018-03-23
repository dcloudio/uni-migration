const rewriter = require('../../../../util')

describe('template.tag.radio.radio-group', () => {

  it('rewrite `radio-group`', () => {
    const fixture = `
<radio-group bindchange="radioChange" dtest="test">
  <label class="weui-cell weui-check__label">
    <view class="weui-cell__hd">
      <radio value="0" checked="true"/>
    </view>
    <view class="weui-cell__bd">单选</view>
  </label>
  <label class="weui-cell weui-check__label">
    <view class="weui-cell__hd">
      <radio value="1" checked="true"/>
    </view>
    <view class="weui-cell__bd">单选</view>
  </label>
</radio-group>
`

    const expected = `<div class="u-w-radio-group"><div class="u-w-label weui-cell weui-check__label"><div class="u-w-view weui-cell__hd"><input class="u-w-radio" value="0" checked="true" name="test" onchange="$handlePageEvent('radioChange',false,false)" type="radio"></input></div><div class="u-w-view weui-cell__bd"><text class="u-w-text">单选</text></div></div><div class="u-w-label weui-cell weui-check__label"><div class="u-w-view weui-cell__hd"><input class="u-w-radio" value="1" checked="true" name="test" onchange="$handlePageEvent('radioChange',false,false)" type="radio"></input></div><div class="u-w-view weui-cell__bd"><text class="u-w-text">单选</text></div></div></div>`

    rewriter.assertTemplateString(fixture, expected)
  })

})